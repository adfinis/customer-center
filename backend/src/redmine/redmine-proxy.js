import * as fs from 'fs'
import url from 'url'
import httpProxy from 'express-http-proxy'

const ALLOWED_ENDPOINTS = ['/issues.json', '/projects.json', '/trackers.json']

const getBasicAuth = function({ username, password }) {
  let encoding = new Buffer(`${username}:${password}`).toString('base64')
  return `Basic ${encoding}`
}

function createProxy(config) {
  const ca = config.ca ? fs.readFileSync(config.ca) : undefined

  let host = config.https ? `https://${config.host}` : config.host

  return httpProxy(config.host, {
    filter(req, res) {
      if (!req.user.hasRedmineAccess()) {
        return false
      }

      return ALLOWED_ENDPOINTS.findIndex(path => req.url.startsWith(path)) > -1
    },

    proxyReqOptDecorator(req, srcReq) {
      // `req.params.switchUser` was set in `filter()` as a workaround
      // to the missing user object on `req`
      req.headers['X-Redmine-Switch-User'] = srcReq.user.get('username')

      if (config.apiKey) {
        req.headers['X-Redmine-API-Key'] = config.apiKey
      }

      if (config.basicAuth) {
        req.headers.Authorization = getBasicAuth(config.basicAuth)
      }
      return req
    },

    userResDecorator(rsp, data, req, res) {
      // Remove redmine cookie from response.
      // I'm not sure if cookie is for the switched user or api access.
      res.removeHeader('set-cookie')
      return data
    }
  })
}

module.exports = { createProxy }
