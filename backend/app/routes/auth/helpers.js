import fs from 'fs';
import * as path from 'path';

import crypto from 'crypto';
import passport from 'passport';
import ldap from 'ldapjs';
import Handlebars from 'handlebars';
import denodeify from 'denodeify';

import { ldapConnection, ldapUsers } from './config';
import { timedLogin } from '../timed/helpers';
import { getCustomer as getTimedCustomer } from '../timed/helpers';
import { users } from '../../initialize/passport';
import PWGen from '../../utils/pwgen';
import debug from '../../debug';
import config from '../../convict';
import redisClient from '../../redis';

//  _                _
// | |    ___   __ _(_)_ __
// | |   / _ \ / _` | | '_ \
// | |__| (_) | (_| | | | | |
// |_____\___/ \__, |_|_| |_|
//             |___/
//

/**
 * Get the navigator language
 *
 * @param {string} acceptLanguage The Accept-Language header
 * @return {string|void}
 */
function getLanguage(acceptLanguage) {
  // Example string: en-US,en-GB;q=0.8,en;q=0.7,de-CH;q=0.5,de-DE;q=0.3,de;q=0.2
  let language = acceptLanguage
    .split(',')
    .find((l) => l.startsWith('en') || l.startsWith('de'));

  if (!language) {
    return null;
  }

  language = language.split('-')[0];
  return ['en', 'de'].includes(language) ? language : null;
}

export function login(strategy, request, response, next) {
  passport.authenticate(strategy, (error, ldapUser, info, status) => {
    if (error) {
      return next(error);
    } else if (!ldapUser) {
      return next({ status, message: info.message });
    } else if (!ldapUser.lang && request.headers['Accept-Language']) {
      ldapUser.lang = getLanguage(request.headers['Accept-Language']);
    }

    loginSuccessful(request, response, next, ldapUser);
  })(request, response, next);
}

function loginSuccessful(request, response, next, ldapUser) {
  request.login(ldapUser, async (loginError) => {
    if (loginError) return next(loginError);

    let claims = {
      iss: config.get('app.name'),
      aud: config.get('app.host'),
      uid: users.get(ldapUser).id,
    };

    const userGroups = users.get(ldapUser).getGroupNames();
    const isMember = (group) => userGroups.some((g) => g.endsWith(group));
    const isMemberOrEmployee = (group) =>
      isMember(group) || users.get(ldapUser).isEmployee();

    // If user is in the timed group, get timed token
    if (isMemberOrEmployee('timed')) {
      request.session = await addTimedTokenToSession(
        request.session,
        users.get(ldapUser)
      );
    }

    request.session.create(claims, (sessionError, token) => {
      if (sessionError) return next(sessionError);

      return response.send({ data: { token } });
    });
  });
}

async function addTimedTokenToSession(session, user) {
  try {
    session.timedTokens = await timedLogin();
    session.timedTokenTTL = new Date().getTime();
    if (!user.isEmployee()) {
      session.timedCustomer = await getTimedCustomer(
        session.timedTokens.access,
        user
      );
    }
  } catch (error) {
    debug.error('timed auth error', error.message);
  }

  return session;
}

//  ____                _
// |  _ \ ___  ___  ___| |_
// | |_) / _ \/ __|/ _ \ __|
// |  _ <  __/\__ \  __/ |_
// |_| \_\___||___/\___|\__|
//

const readFile = denodeify(fs.readFile);

export function getMailSubject(language = 'en') {
  let name = config.get('app.name');

  switch (language) {
    case 'de':
      return `Passwort reset für ${name}`;

    default:
    case 'en':
      return `Reset password on ${name}`;
  }
}

/**
 * Creates an email body from a template name and context.
 * @param {string} view The template name without path and file-extension.
 * @param {object} context The context provided to the template.
 */
export async function prepareEmailBody(view, context) {
  let filepath = path.resolve(__dirname, '../..', 'templates', `${view}.hbs`);
  let source = await readFile(filepath, 'utf8');
  let template = Handlebars.compile(source);

  return template(context);
}

export function createPassword(len) {
  let gen = new PWGen();
  gen.maxLength = len;
  return gen.generate();
}

export function createToken() {
  return new Promise((resolve, reject) =>
    crypto.randomBytes(16, (error, buffer) => {
      if (error) return reject(error);
      resolve(buffer.toString('hex'));
    })
  );
}

export function setToken(ident, token) {
  return new Promise((resolve, reject) => {
    redisClient.set(`pw-reset-token-${token}`, ident, (error) =>
      error ? reject(error) : resolve()
    );
    redisClient.expire(
      `pw-reset-token-${token}`,
      config.get('auth.expirePassword')
    );
  });
}

export function getIdent(token) {
  return new Promise((resolve, reject) =>
    redisClient.get(`pw-reset-token-${token}`, (error, ident) =>
      error ? reject(error) : resolve(ident)
    )
  );
}

function ldapBind(ldapClient, dn, password) {
  return new Promise((resolve, reject) =>
    ldapClient.bind(dn, password, (error) =>
      error ? reject(error) : resolve()
    )
  );
}

function ldapFindOne(ldapClient, searchBase, options) {
  return new Promise((resolve, reject) =>
    ldapClient.search(searchBase, options, (error, response) => {
      if (error) return reject(error);

      let searchEntry;

      // eslint-disable-next-line no-return-assign
      response.once('searchEntry', (entry) => (searchEntry = entry));
      response.once('error', reject);
      response.once('end', () => resolve(searchEntry));
    })
  );
}

function ldapModify(ldapClient, dn, changes) {
  return new Promise((resolve, reject) =>
    ldapClient.modify(dn, changes, (error) =>
      error ? reject(error) : resolve()
    )
  );
}

export async function setPassword(uid, password) {
  let { url, bindDn, bindCredentials } = ldapConnection;
  let { passwordField, searchBase, searchFilter } = ldapUsers;
  let ldapClient = ldap.createClient({ url });

  await ldapBind(ldapClient, bindDn, bindCredentials);

  try {
    let { dn, attributes } = await ldapFindOne(ldapClient, searchBase, {
      filter: searchFilter.replace('{{username}}', uid),
      attributes: ['dn', passwordField],
      scope: 'sub',
    });

    let {
      vals: [oldPassword],
    } = attributes.find((attribute) => attribute.type === passwordField);

    await ldapModify(ldapClient, dn, [
      new ldap.Change({
        operation: 'delete',
        modification: {
          [passwordField]: oldPassword,
        },
      }),
      new ldap.Change({
        operation: 'add',
        modification: {
          [passwordField]: password,
        },
      }),
    ]);
  } finally {
    ldapClient.unbind();
  }
}
