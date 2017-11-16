import url from 'url'
import path from 'path'
import httpProxy from 'express-http-proxy'

const subProject = '/subscription-projects'
const subPackage = '/subscription-packages'
const subOrder = '/subscription-orders'
const report = '/reports'

const allowedEndpoints = [subProject, subPackage, subOrder, report]

function createProxy(config) {
  return httpProxy(config.host, {
    parseReqBody: false,

    filter(req) {
      return allowedEndpoints.includes(req.path) && req.session.timedCustomer.id
    },

    proxyReqPathResolver(req) {
      const newPath = path.join(config.prefix, req.path)
      const queryParams = url.parse(req.url, true).query
      const timedCustomer = req.session.timedCustomer

      // Frontend can not set the query param "customer"
      Reflect.deleteProperty(queryParams, 'customer')

      const queryString = Object.keys(queryParams)
        .map(key => `${key}=${queryParams[key]}`)
        .join('&')

      if (req.path === subProject) {
        return `${newPath}?customer=${timedCustomer.id}&${queryString}`
      }

      return url.parse(path.join(config.prefix, req.url)).path
    },

    proxyReqOptDecorator(proxyReqOpts, { session: { timedToken } }) {
      if (timedToken) {
        proxyReqOpts.headers.Authorization = `Bearer ${timedToken}`
      }

      return proxyReqOpts
    }
  })
}

module.exports = { createProxy }
