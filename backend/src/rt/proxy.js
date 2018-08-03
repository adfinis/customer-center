import httpProxy from 'express-http-proxy'
import path from 'path'

export default function createProxy(config) {
  return httpProxy(config.host, {
    proxyReqPathResolver(req) {
      return `${path.join(config.prefix, req.path)}?${Object.keys(req.query)
        .map(key => `${key}=${req.query[key]}`)
        .join('&')}`
    },

    proxyReqOptDecorator(proxyReqOpts, { session: { rtToken } }) {
      if (rtToken) {
        proxyReqOpts.headers.Authorization = `JWT ${rtToken}`
      }

      return proxyReqOpts
    }
  })
}
