module.exports = {
  application: {
    name: 'Customer Center',
    host: 'customer-center.example.com'
  },
  ldap: {
    // Further information how to configure LDAP under:
    // https://github.com/vesse/passport-ldapauth
    url: 'ldap://ldap:389',
    bindDn: 'cn=admin,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch',
    // ldap password
    bindCredentials: '123qwe',
    cert: ''
  },
  login: {
    adminRole: 'adsy-timed-admin',
    employeeRole: 'adsy-user',

    ldap: {
      // Further information how to configure LDAP under:
      // https://github.com/vesse/passport-ldapauth
      searchBase: 'cn=users,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch',
      searchFilter: 'uid={{username}}',
      searchAttributes: ['uid', 'sn', 'givenName', 'mail'],

      groupSearchBase: 'cn=groups,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch',
      groupSearchFilter: '(|(uniqueMember={{dn}})(memberUid={{dn}}))',
      groupSearchScope: 'sub',
      groupDnProperty: 'dn',
      groupSearchAttributes: ['cn'],

      usernameField: 'uid',
      passwordField: 'userPassword'
    },
    ldapCustomer: {
      // Further information how to configure LDAP under:
      // https://github.com/vesse/passport-ldapauth
      searchBase: 'ou=customers,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch',
      searchFilter: 'uid={{username}}',
      searchAttributes: ['uid', 'sn', 'givenName', 'mail'],

      groupSearchBase:
        'ou=customers,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch',
      groupSearchFilter: '(|(uniqueMember={{dn}})(memberUid={{dn}}))',
      groupSearchScope: 'sub',
      groupDnProperty: 'dn',
      groupSearchAttributes: ['cn'],

      usernameField: 'uid',
      passwordField: 'userPassword'
    },
    secret: 'ponies'
  },
  mailTransporter: {
    host: 'localhost',
    port: 25,
    secure: false,
    // secureConnection: true,
    // requireTLS: true
  },
  mail: {
    from: 'your.service@email.address',
    to: 'your.target@email.address'
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
    ignoreTLS: false,
    name: 'customer-center.example.com',
    localAddress: '0.0.0.0',
    // auth: {
    //   user: 'username',
    //   pass: 'password'
    // },
    // authMethod: 'PLAIN'
  },
  redis: {
    host: 'redis',
    port: 6379,
    options: {}
  },
  keycloak: {
    host: 'http://keycloak:8080',
    tokenPath: '/auth/realms/master/protocol/openid-connect/token',
    clientId: 'timed-confidential',
    clientSecret: '802635ae-2395-4419-b15b-b09dc838db14'
  },
  services: {
    vault: {
      type: 'vault',
      host: 'http://vault:8200',
      prefix: '/v1/',
      backend: 'secret/',
      authBackend: 'userpass',
      ttl: 600000
    },
    timed: {
      type: 'timed',
      host: 'http://timedbackend',
      prefix: '/api/v1',
    },
    gitlab: {
      type: 'gitlab',
      host: 'http://gitlab:80',
      token: 'your_token',
      prefix: '/api/v4'
    },
    rt: {
      type: 'rt',
      host: 'http://rt',
      prefix: '/api/v1',
      authPath: '/api-token-auth/',
      authRefresh: '/api-token-refresh/',
      ttl: 7200
    }
  }
}
