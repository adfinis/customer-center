import path from 'path'
import httpProxy from 'express-http-proxy'
import rp from 'request-promise'
import config from '../config'
import parseDjangoDuration from '../utils/parse-django-duration'
import * as Sentry from '@sentry/node'
import { captureExceptionWithUser } from '../utils/sentry'

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

/*
 * Report an invalid access lookup to sentry for debugging
 */
function reportInvalidAccess(req, access, route) {
  captureExceptionWithUser(req.user, function(scope) {
    scope.setLevel('info')

    scope.setExtra('role', access)
    scope.setExtra('request', `${req.method} ${req.path}`)
    scope.setExtra(
      'request-route-access',
      JSON.stringify(
        Object.assign({}, route, {
          path: route.path.toString()
        })
      )
    )

    Sentry.captureException(new Error('Access lookup failed'))
  })
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
        const hasAccess = routes[route].access[access].includes(req.method)
        if (!hasAccess) {
          reportInvalidAccess(req, access, routes[route])
        }
        return hasAccess
      } else {
        // Also report error if the role does not exist on access definition
        reportInvalidAccess(req, access, routes[route])
      }
    }
  }
  return false
}

/**
 * Send confirmation mail for order
 * @author Jonas Cosandey (jonas.cosandey@adfinis-sygroup.ch)
 */
async function sendMail(req) {
  let mailTransporter = req.app.get('mailTransporter')
  mailTransporter.verify(async function(error) {
    if (error) {
      console.log(`Mail transporter failed: ${error}`)
      return
    }

    let { host, prefix } = config.services.timed
    let {
      data: {
        id: projectId,
        attributes: {
          name: projectName,
          'purchased-time': projectPurchasedTime,
          'spent-time': projectSpentTime
        }
      }
    } = JSON.parse(
      await rp({
        method: 'get',
        uri: `${host}${prefix}/subscription-projects/${
          req.body.data.relationships.project.data.id
        }`,
        headers: {
          accept: 'application/vnd.api+json',
          'content-type': 'application/vnd.api+json',
          Authorization: `Bearer ${req.session.timedTokens.access}`
        }
      })
    )

    let customer = req.session.timedCustomer,
      duration = parseDjangoDuration(req.body.data.attributes.duration),
      newTime = parseDjangoDuration(projectPurchasedTime)
        .add(duration)
        .subtract(parseDjangoDuration(projectSpentTime))

    mailTransporter.sendMail({
      from: config.mail.from,
      to: config.mail.to,
      subject: `Customer Center Credits/Reports: ${
        customer.attributes.name
      } hat ${duration.asHours()} Stunde/n bestellt.`,
      text: `Kunde ${
        customer.attributes.name
      } hat für ${projectName} ${duration.asHours()} Stunden bestellt.\n Das neue Projekt Total (falls die Bestellung akzeptiert wird) wäre ${newTime.asHours()} Stunden.\n\n https://my.adfinis-sygroup.ch/timed-admin/confirm-subscriptions`,
      html: `
        <b>Aufladung von ${duration.asHours()} Stunde/n</b>
        <ul>
        <li>Kunde: ${customer.attributes.name}</li>
        <li>Projekt: ${projectName}</li>
        <li>Projekt Total mit Aufladung: ${newTime.asHours()} Stunde/n</li>
        </ul>

        <div style="font-size: 12px;">
        __________________________________<br>
        <a href="https://my.adfinis-sygroup.ch/timed-admin/confirm-subscriptions">Im Customer Center anzeigen</a><br>
        <a href="https://my.adfinis-sygroup.ch/timed-admin/${projectId}">Kunde anzeigen</a>
        <br><br>
        <b>Customer Center</b><br>Credits / Reports
        </div>
      `
    })
  })
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

      if (
        req.path.match(routes.subscriptionOrders.path) &&
        req.method === 'POST'
      ) {
        sendMail(req)
      }

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
