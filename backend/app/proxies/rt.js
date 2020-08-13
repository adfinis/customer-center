import httpProxy from 'express-http-proxy';
import path from 'path';

export default function createProxy(config) {
  return httpProxy(config.host, {
    proxyReqPathResolver(request) {
      return `${path.join(config.prefix, request.path)}?${Object.keys(
        request.query
      )
        .map(key => `${key}=${request.query[key]}`)
        .join('&')}`;
    },

    proxyReqOptDecorator(proxyReqOpts, { session: { rtToken } }) {
      if (rtToken) {
        proxyReqOpts.headers.Authorization = `JWT ${rtToken}`;
      }

      return proxyReqOpts;
    }
  });
}
