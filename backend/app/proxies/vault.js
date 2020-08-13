import fs from 'fs';
import url from 'url';
import path from 'path';
import httpProxy from 'express-http-proxy';

export default function createProxy(config) {
  const ca = config.ca ? fs.readFileSync(config.ca) : undefined;

  return httpProxy(config.host, {
    proxyReqPathResolver(request) {
      return url.parse(path.join(config.prefix, request.url)).path;
    },

    proxyReqOptDecorator(proxyReqOpts, { session: { vaultToken } }) {
      proxyReqOpts.headers['Content-Type'] = 'application/json';

      if (vaultToken) {
        proxyReqOpts.headers['X-Vault-Token'] = vaultToken;
      }

      if (ca) {
        proxyReqOpts.ca = ca;
      }

      return proxyReqOpts;
    }
  });
}
