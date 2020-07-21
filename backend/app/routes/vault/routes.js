import url from 'url';
import rp from 'request-promise';
import { Router } from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import https from 'https';
import { get } from 'lodash';
import fetch from 'node-fetch';

import config from '../../config';
import debug from '../../debug';
import { getAuthenticator, getCleanPath, listVault } from './helpers';

const { host, prefix, backend, ca } = config.services.vault;

const router = new Router();
export default router;

router.get('/get/*', async (request, response) => {
  const path = getCleanPath(request.path, '/get/');
  const uri = url.resolve(host, prefix) + path;

  let secret;
  let errors;

  try {
    const resp = await fetch(uri, {
      method: 'GET',
      headers: { 'X-Vault-Token': request.session.vaultToken },
      agent: parsedURL => {
        if (!ca) {
          return;
        } else if (parsedURL.protocol === 'http:') {
          return new http.Agent({ cert: ca });
        } else {
          return new https.Agent({ cert: ca });
        }
      }
    });

    const json = await resp.json();
    secret = get(json, 'data.data');
  } catch (error) {
    debug.error('vault/get:', error);
    errors = [error.message];
  }

  response.send({
    secret,
    errors
  });
});

router.get('/list', async (request, response) => {
  try {
    let path = prefix + backend + 'metadata/';
    let data = await listVault(request.session.vaultToken, path);
    response.send(data);
  } catch (error) {
    debug.error('vault/list:', error);
    response.status(error.statusCode);
    response.send(error.message);
  }
});
