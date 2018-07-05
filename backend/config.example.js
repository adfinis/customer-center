module.exports = {
  application: {
    name: 'Customer Center',
    host: 'customer-center.example.com'
  },
  ldap: {
    // Further information how to configure LDAP under:
    // https://github.com/vesse/passport-ldapauth
    url: 'ldap://ucs1:389',
    bindDn: '',
    bindCredentials: '',
    cert: '/path/to/root_ca_cert.crt'
  },
  login: {
    adminRole: 'some-role',
    internRole: 'some-other-role',

    ldap: {
      // Further information how to configure LDAP under:
      // https://github.com/vesse/passport-ldapauth
      searchBase: '',
      searchFilter: 'uid={{username}}',
      searchAttributes: ['uid', 'sn', 'givenName', 'mail'],

      groupSearchBase: '',
      groupSearchFilter: 'memberUid={{dn}}',
      groupSearchScope: 'sub',
      groupDnProperty: 'uid',
      groupSearchAttributes: ['cn'],

      usernameField: 'uid',
      passwordField: 'userPassword'
    },
    ldapCustomer: {
      // Further information how to configure LDAP under:
      // https://github.com/vesse/passport-ldapauth
      searchBase: '',
      searchFilter: 'uid={{username}}',
      searchAttributes: ['uid', 'sn', 'givenName', 'mail'],

      groupSearchBase: '',
      groupSearchFilter: 'memberUid={{dn}}',
      groupSearchScope: 'sub',
      groupDnProperty: 'uid',
      groupSearchAttributes: ['cn'],

      usernameField: 'uid',
      passwordField: 'userPassword'
    },
    secret: 'ponies'
  },
  database: {
    client: 'pg',
    connection: {
      host: 'postgres',
      user: 'test',
      password: 'test',
      database: 'customercenter'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  },
  passwordReset: {
    expire: 3600
  },
  smtp: {
    port: 25,
    host: 'localhost',
    secure: false,
    auth: {
      user: 'username',
      pass: 'password'
    },
    ignoreTLS: false,
    name: 'customer-center.example.com',
    localAddress: '0.0.0.0',
    authMethod: 'PLAIN'
  },
  redis: {
    host: 'redis',
    port: 6379,
    options: {}
  },
  services: {
    vault: {
      type: 'vault',
      host: 'http://vault1:8200/',
      prefix: '/v1/',
      backend: 'secret/',
      authBackend: 'userpass',
      ttl: 600000 // Time in ms until to renew vault token
    },
    timed: {
      type: 'timed',
      host: 'http://timedbackend1:80',
      user: 'API user to get the token',
      password: 'pass',
      prefix: '/api/v1',
      authPath: '/auth/login',
      authRefresh: '/auth/refresh',
      ttl: 7200 // token TTL in seconds
    },
    gitlab: {
      type: 'gitlab',
      host: 'http://gitlab:80',
      token: 'your_token',
      prefix: '/api/v4'
    }
  }
}
