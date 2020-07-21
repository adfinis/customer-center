import fs from 'fs';
import fetch from 'node-fetch';
import rp from 'request-promise';
import url from 'url';

import config from '../../config';
import debug from '../../debug';

const { host, prefix, ca } = config.services.vault;

export function getAuthenticator(caPath) {
  return (token, options) => {
    return Object.assign({}, options, {
      headers: { 'X-Vault-Token': token },
      ca: caPath ? fs.readFileSync(caPath) : undefined
    });
  };
}

function updateKey(key) {
  // TODO This should be done with RegEx.
  //      Otherwise, we cannot have a secret named "metadata"
  //      or one that contains the prefix.
  return key.replace(prefix, '').replace('metadata', 'data');
}

export function getCleanPath(path, method) {
  return path.startsWith(method) ? path.substr(method.length) : path;
}

export async function listVault(token, path) {
  let uri = host + path;

  let auth = getAuthenticator(ca);
  let options = auth(token, { method: 'LIST' });

  let response = await fetch(uri, options);

  let { data } = await response.json();

  let result = {
    values: {},
    children: {}
  };

  if (data && data.keys) {
    data.keys.filter(key => !key.endsWith('/')).forEach(key => {
      result.values[key] = { path: updateKey(path + key) };
    });

    await Promise.all(
      data.keys.filter(key => key.endsWith('/')).map(async key => {
        result.children[key] = await listVault(token, path + key);
      })
    );
  }

  return result;
}

/**
 * Renew the ttl of the client token
 * @param  {String} token  Vault client token
 * @param  {String} host   Vault host
 * @param  {String} prefix Vault API prefix eg v1
 * @param  {String} ca     Certificate path
 * @return {Promise}       Request promise
 */
export function refreshToken(token) {
  const { host, prefix, ca } = config.services.vault;
  const auth = getAuthenticator(ca);

  const options = {
    method: 'POST',
    uri: `${url.resolve(host, prefix)}auth/token/renew`,
    body: { token },
    json: true
  };

  return rp(auth(token, options));
}
