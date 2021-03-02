import passport from 'passport';
import jwt from 'jwt-redis-session';
import LdapStrategy from 'passport-ldapauth';

import {
  ldapConnection,
  ldapUsers,
  ldapCustomers,
} from '../routes/auth/config';
import User from '../routes/user/model';
import config from '../convict';
import redisClient from '../redis';

const sessionLifeTime = 24 * 60 * 60; // 1 day

passport.use(
  'ldapauth-user',
  new LdapStrategy({
    server: Object.assign({}, ldapConnection, ldapUsers),
  })
);

passport.use(
  'ldapauth-customer',
  new LdapStrategy({
    server: Object.assign({}, ldapConnection, ldapCustomers),
  })
);

// Passport doesn't set request.user directly after login
// save user in weakmap with the ldap response as key
export let users = new WeakMap();

passport.serializeUser(async (ldap, done) => {
  try {
    users.set(ldap, await User.syncLdap(ldap));
    done(null, ldap.uid);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async (uid, done) => {
  try {
    let user = await new User({ username: uid }).fetch({ required: true });

    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default function initializePassport(app) {
  app.use(
    jwt({
      client: redisClient,
      secret: config.get('auth.secret'),
      keyspace: 'session:',
      maxAge: sessionLifeTime,
      algorithm: 'HS256', // sha256
      requestKey: 'session',
      requestArg: 'Authorization',
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
}
