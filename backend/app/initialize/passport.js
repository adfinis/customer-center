import passport from 'passport';
import redis from 'redis';
import jwt from 'jwt-redis-session';
import LdapStrategy from 'passport-ldapauth';

import config from '../config';
import User from '../routes/user/model';

// eslint-disable-next-line no-magic-numbers
const sessionLifeTime = 24 * 60 * 60; // 1 day

passport.use(
  'ldapauth-user',
  new LdapStrategy({
    server: Object.assign({}, config.ldap, config.login.ldap),
  })
);

passport.use(
  'ldapauth-customer',
  new LdapStrategy({
    server: Object.assign({}, config.ldap, config.login.ldapCustomer),
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
      client: redis.createClient(
        config.redis.port,
        config.redis.host,
        config.redis.options
      ),
      secret: config.login.secret,
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
