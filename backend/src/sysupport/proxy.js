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
      return allowedEndpoints.includes(req.path) && req.session
        .timedCustomer.id
    },

    // eslint-disable-next-line max-statements
    proxyReqPathResolver(req) {
      const newPath = path.join(config.prefix, req.path)
      const timedCustomer = req.session.timedCustomer
      const queryParams = req.query

      // Frontend can not set the query param "customer"
      Reflect.deleteProperty(queryParams, 'customer')
      if (req.path === report) {
        Reflect.deleteProperty(queryParams, 'not_billable')
        Reflect.deleteProperty(queryParams, 'review')
      }

      const queryString = Object.keys(queryParams)
        .map(key => `${key}=${queryParams[key]}`)
        .join('&')
      if (req.path === report) {
        return `${newPath}?customer=${
          timedCustomer.id
        }&not_billable=0&review=0&${queryString}`
      }

      return `${newPath}?customer=${timedCustomer.id}&${queryString}`
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
