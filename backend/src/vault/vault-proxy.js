import * as fs from 'fs'
import url from 'url'
import path from 'path'
import httpProxy from 'express-http-proxy'

function createProxy(config) {
  const ca = config.ca ? fs.readFileSync(config.ca) : undefined

  return httpProxy(config.host, {
    parseReqBody: false,

    proxyReqPathResolver(req) {
      return url.parse(path.join(config.prefix, req.url)).path
    },

    proxyReqOptDecorator(proxyReqOpts, { session: { vaultToken } }) {
      if (vaultToken) {
        proxyReqOpts.headers['X-Vault-Token'] = vaultToken
      }
      if (ca) {
        proxyReqOpts.ca = ca
      }
      return proxyReqOpts
    }
  })
}

module.exports = { createProxy }
