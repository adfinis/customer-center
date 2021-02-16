import path from 'path';
import httpProxy from 'express-http-proxy';
import rp from 'request-promise';
import queryString from 'qs';

import config from '../config';
import debug from '../debug';
import { parseDuration } from '../utils/django';
import { reportInvalidAccess } from '../utils/sentry';
import { prepareEmailBody } from '../routes/auth/helpers';

const routes = {
  subscriptionProject: {
    path: /^\/subscription-projects(\/[1-9][0-9]*|)$/,
    access: {
      admin: ['GET'],
      user: ['GET'],
      customer: ['GET'],
    },
  },
  subscriptionPackages: {
    path: /^\/subscription-packages$/,
    access: {
      customer: ['GET'],
    },
  },
  subscriptionOrders: {
    path: /^\/subscription-orders$/,
    access: {
      admin: ['GET', 'DELETE', 'POST'],
      user: ['GET', 'DELETE'],
      customer: ['GET', 'POST'],
    },
  },
  subscriptionOrder: {
    path: /^\/subscription-orders\/[1-9][0-9]*$/,
    access: {
      admin: ['DELETE'],
      user: ['DELETE'],
    },
  },
  subscriptionOrderConfirm: {
    path: /^\/subscription-orders\/[1-9][0-9]*\/confirm$/,
    access: {
      admin: ['POST'],
    },
  },
  reports: {
    path: /^\/reports$/,
    access: {
      admin: ['GET'],
      user: ['GET'],
      customer: ['GET'],
    },
  },
  customer: {
    path: /^\/customers(\/[1-9][0-9]*|)$/,
    access: {
      admin: ['GET'],
      user: ['GET'],
    },
  },
};

/**
 * Check if user has access to route
 * @return boolean - returns true if has access
 **/
function checkAccess(request) {
  if (
    !request.user.isEmployee() &&
    typeof request.session.timedCustomer === 'undefined'
  ) {
    return false;
  }

  let access = request.user.isAdmin()
    ? 'admin'
    : request.user.isAdsyUser()
    ? 'user'
    : 'customer';

  for (let route in routes) {
    if (request.path.match(routes[route].path)) {
      if (routes[route].access.hasOwnProperty(access)) {
        const hasAccess = routes[route].access[access].includes(request.method);
        if (!hasAccess) {
          reportInvalidAccess(request, access, routes[route]);
        }
        return hasAccess;
      } else {
        // Also report error if the role does not exist on access definition
        reportInvalidAccess(request, access, routes[route]);
      }
    }
  }

  return false;
}

/**
 * Send confirmation mail for order
 * @author Jonas Cosandey <jonas.cosandey@adfinis-sygroup.ch>
 */
async function sendMail(request) {
  let mailTransporter = request.app.get('mailTransporter');
  mailTransporter.verify(async function (error) {
    if (error) {
      debug.error(`Mail transporter failed: ${error}`);
      return;
    }

    let { host, prefix } = config.services.timed;

    let {
      data: {
        id: projectId,
        attributes: {
          name: projectName,
          'purchased-time': projectPurchasedTime,
          'spent-time': projectSpentTime,
        },
      },
    } = JSON.parse(
      await rp({
        method: 'get',
        uri: `${host}${prefix}/subscription-projects/${request.body.data.relationships.project.data.id}`,
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Bearer ${request.session.timedTokens.access}`,
        },
      })
    );

    let customer = request.session.timedCustomer;
    let customerName = customer.attributes.name;

    let duration = parseDuration(request.body.data.attributes.duration);
    let hoursAdded = duration.asHours();

    let newTime = parseDuration(projectPurchasedTime)
      .add(duration)
      .subtract(parseDuration(projectSpentTime));
    let hoursTotal = newTime.asHours();

    await mailTransporter.sendMail({
      from: config.mail.from,
      to: config.mail.to,
      subject: `Customer Center Credits/Reports: ${customerName} hat ${hoursAdded} Stunde/n bestellt.`,
      text: [
        `Kunde ${customerName} hat für ${projectName} ${hoursAdded} Stunden bestellt.`,
        `Das neue Projekt Total (falls die Bestellung akzeptiert wird) wäre ${hoursTotal} Stunden.`,
        '',
        `https://my.adfinis-sygroup.ch/timed-admin/confirm-subscriptions`,
      ].join('\n'),
      html: prepareEmailBody('subscription.de', {
        projectId,
        projectName,
        customerName,
        hoursAdded,
        hoursTotal,
      }),
    });
  });
}

export default function createProxy(config) {
  return httpProxy(config.host, {
    filter(request) {
      return checkAccess(request);
    },

    // eslint-disable-next-line max-statements
    proxyReqPathResolver(request) {
      let newPath = `${path.join(config.prefix, request.path)}?`;
      let queryParams = request.query;

      if (
        request.method === 'POST' &&
        request.path.match(routes.subscriptionOrders.path)
      ) {
        sendMail(request);
      }

      // Frontend can not set the query param "customer"
      Reflect.deleteProperty(queryParams, 'customer');

      if (!request.user.isEmployee()) {
        newPath += `customer=${request.session.timedCustomer.id}`;
      }

      if (request.path.match(routes.reports.path)) {
        Reflect.deleteProperty(queryParams, 'not_billable');
        Reflect.deleteProperty(queryParams, 'review');
        newPath += '&not_billable=0&review=0';
      }

      return newPath + '&' + queryString.stringify(queryParams);
    },

    proxyReqOptDecorator(
      proxyReqOpts,
      {
        session: {
          timedTokens: { access: token },
        },
      }
    ) {
      if (token) {
        proxyReqOpts.headers.Authorization = `Bearer ${token}`;
      }

      return proxyReqOpts;
    },
  });
}
