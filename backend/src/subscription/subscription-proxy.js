import httpProxy from 'express-http-proxy'
import url from 'url'
import path from 'path'

function createProxy(config) {
  return httpProxy(config.host, {
    proxyReqPathResolver(req) {
      return url.parse(path.join(config.prefix, req.url)).path
    },
    proxyReqOptDecorator(proxyReqOpts, { session: { subscriptionToken } }) {
      if (subscriptionToken) {
        proxyReqOpts.headers.Authorization = `Bearer ${subscriptionToken}`
      }
      proxyReqOpts.headers['Content-Type'] = 'application/vnd.api+json'
      proxyReqOpts.headers.Accept = 'application/vnd.api+json'
      return proxyReqOpts
    }
  })
}
module.exports = { createProxy }
