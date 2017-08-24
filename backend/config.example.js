export default {
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
      host: 'postgres1',
      user: 'test',
      password: 'test',
      database: 'adsycc'
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
    host: 'redis1',
    port: 6379,
    options: {}
  },
  services: {
    redmine: {
      type: 'redmine',
      ldapGroup: 'redmine',
      host: 'redmine1',
      https: false,
      user: 'admin',
      apiKey: '',
      basicAuth: {
        username: 'admin',
        password: 'admin'
      }
    },
    rt: {
      type: 'rt',
      version: 4,
      knex: {
        client: 'sqlite3',
        connection: {
          filename: '/var/rt4/rt4'
        }
      }
    },
    timescout: {
      type: 'timescout',
      host: 'https://support.example.com/api',
      apiKey: 'somerandomkey'
    },
    symon: {
      type: 'symon',
      host: '0.0.0.0',
      user: 'foo',
      password: 'bar',
      queues: 32,
      app: 'app/queue name',
      ttl: 10000
    },
    vault: {
      type: 'vault',
      host: 'http://vault1:8200/',
      prefix: '/v1/',
      backend: 'secret/',
      ttl: 600000 // Time in ms until to renew vault token
    }
  }
}
