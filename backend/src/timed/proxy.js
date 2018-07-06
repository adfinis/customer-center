import path from 'path'
import httpProxy from 'express-http-proxy'

const routes = {
  subscriptionProject: {
    path: /^\/subscription-projects(\/[1-9][0-9]*|)$/,
    access: {
      admin: ['GET'],
      user: ['GET'],
      customer: ['GET']
    }
  },
  subscriptionPackages: {
    path: /^\/subscription-packages$/,
    access: {
      customer: ['GET']
    }
  },
  subscriptionOrders: {
    path: /^\/subscription-orders$/,
    access: {
      admin: ['GET', 'DELETE', 'POST'],
      user: ['GET', 'DELETE'],
      customer: ['GET', 'POST']
    }
  },
  subscriptionOrder: {
    path: /^\/subscription-orders\/[1-9][0-9]*$/,
    access: {
      admin: ['DELETE'],
      user: ['DELETE']
    }
  },
  subscriptionOrderConfirm: {
    path: /^\/subscription-orders\/[1-9][0-9]*\/confirm$/,
    access: {
      admin: ['POST']
    }
  },
  reports: {
    path: /^\/reports$/,
    access: {
      admin: ['GET'],
      user: ['GET'],
      customer: ['GET']
    }
  },
  customer: {
    path: /^\/customers(\/[1-9][0-9]*|)$/,
    access: {
      admin: ['GET'],
      user: ['GET']
    }
  }
}

/**
 * Check if user has access to route
 * @return boolean - returns true if has access
 **/
function checkAccess(req) {
  if (
    !req.user.isEmployee() &&
    typeof req.session.timedCustomer === 'undefined'
  ) {
    return false
  }
  let access = req.user.isAdmin()
    ? 'admin'
    : req.user.isAdsyUser() ? 'user' : 'customer'
  for (let route in routes) {
    if (req.path.match(routes[route].path)) {
      if (routes[route].access.hasOwnProperty(access)) {
        return routes[route].access[access].includes(req.method)
      } else {
        return false
      }
    }
  }
  return false
}

function createProxy(config) {
  return httpProxy(config.host, {
    filter(req) {
      return checkAccess(req)
    },

    // eslint-disable-next-line max-statements
    proxyReqPathResolver(req) {
      let newPath = `${path.join(config.prefix, req.path)}?`
      const queryParams = req.query

      // Frontend can not set the query param "customer"
      Reflect.deleteProperty(queryParams, 'customer')

      const queryString = Object.keys(queryParams)
        .map(key => `${key}=${queryParams[key]}`)
        .join('&')

      if (!req.user.isEmployee()) {
        newPath += `customer=${req.session.timedCustomer.id}`
      }
      if (req.path.match(routes.reports.path)) {
        Reflect.deleteProperty(queryParams, 'not_billable')
        Reflect.deleteProperty(queryParams, 'review')
        newPath += '&not_billable=0&review=0'
      }
      newPath += `&${queryString}`
      return newPath
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
