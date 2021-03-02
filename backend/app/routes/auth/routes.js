import fs from 'fs';

import { Router } from 'express';
import rp from 'request-promise';

import {
  login,
  createToken,
  setToken,
  getMailSubject,
  prepareEmailBody,
  createPassword,
  setPassword,
  getIdent,
  sendMail,
} from './helpers';
import { ldapCustomers } from './config';
import User from '../user/model';
import debug from '../../debug';
import config from '../../convict';
import redisClient from '../../redis';

const router = new Router();
export default router;

router.post('/login', (request, response, next) => {
  login('ldapauth-user', request, response, (error) => {
    if (error && ldapCustomers) {
      return login('ldapauth-customer', request, response, next);
    } else if (error) {
      return next(error);
    } else {
      return next();
    }
  });
});

router.post('/logout', async (request, response) => {
  request.logout();
  response.status(200);
  response.end();
});

// TODO: Should we report errors on this route?
router.post('/send-new-password', async (request, response, next) => {
  try {
    let ident = request.body.identification;
    let token = await createToken();
    let user = await new User({
      username: ident,
    }).fetch(/*{ required: true }*/);
    let host = config.get('app.host');

    if (user && user.get('email')) {
      await setToken(ident, token);

      let language = user.get('language') || 'en';
      let template = `password-reset.${language}`;

      await sendMail({
        from: `noreply@${host}`,
        to: user.get('email'),
        subject: getMailSubject(language),
        text: await prepareEmailBody(template, {
          url: `https://${host}/login/new-password/${token}`,
        }),
      });

      response.send({
        data: {
          message: 'Great success!',
          href: 'https://www.youtube.com/watch?v=J88-RdWnNT0',
        },
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get('/reset-password/:token', async (request, response, next) => {
  try {
    if (!request.params.token) {
      return next({ status: 404, message: 'Not found' });
    }

    let ident = await getIdent(request.params.token);

    if (!ident) {
      return next({ status: 404, message: 'Not found' });
    }

    redisClient.del(`pw-reset-token-${request.params.token}`);

    let password = createPassword(12);

    await setPassword(ident, password);

    response.send({ data: { password } });
  } catch (error) {
    next(error);
  }
});
