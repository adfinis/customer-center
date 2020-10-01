module.exports = {
  application: {
    name: 'Customer Center',
    host: 'localhost:3000'
  },
  ldap: {
    url: 'ldap://localhost:4389',
    bindDn:
      'uid=Administrator,cn=users,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch',
    bindCredentials: 'univention'
  },
  login: {
    adminRole: 'adsy-user',
    employeeRole: 'adsy-user',

    ldap: {
      searchBase: 'cn=users,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch',
      searchFilter: '(uid={{username}})',
      searchAttributes: ['uid', 'sn', 'mail'],

      groupSearchBase: 'cn=groups,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch',
      groupSearchFilter:
        '(&(|(uniqueMember={{dn}})(memberUid={{dn}}))(objectClass=posixGroup))',
      groupSearchScope: 'sub',
      groupDnProperty: 'dn',
      groupSearchAttributes: ['cn'],

      usernameField: 'uid',
      passwordField: 'userPassword'
    },
    ldapCustomer: {
      searchBase: 'ou=customers,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch',
      searchFilter: '(uid={{username}})',
      searchAttributes: ['uid', 'sn', 'mail'],

      groupSearchBase:
        'ou=customers,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch',
      groupSearchFilter:
        '(&(|(uniqueMember={{dn}})(memberUid={{dn}}))(objectClass=posixGroup))',
      groupSearchScope: 'sub',
      groupDnProperty: 'dn',
      groupSearchAttributes: ['cn'],

      usernameField: 'uid',
      passwordField: 'userPassword'
    },
    secret: 'ponies'
  },
  mailTransporter: {
    host: 'mailcatcher', // hostname
    secureConnection: false, // use SSL
    port: 1025, // port for secure SMTP
    secure: false,
    requireTLS: false
  },
  mail: {
    from: 'customer-center@ma.il',
    to: 'person@ma.il'
  },
  database: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'test',
      password: 'test',
      database: 'customercenter_test'
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
    host: 'localhost',
    port: 6379,
    options: {}
  },
  keycloak: {
    host: 'https://sso.adfinis-sygroup.ch',
    tokenPath: '/auth/realms/adsy/protocol/openid-connect/token',
    clientId: 'timed-confidential',
    clientSecret: ''
  },
  services: {
    timed: {
      type: 'timed',
      host: 'http://timedbackend',
      prefix: '/api/v1',
    },
  }
};
