import convict from 'convict';
import convict_format_with_validator from 'convict-format-with-validator';

convict.addFormats(convict_format_with_validator);

let config = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['development', 'testing', 'production'],
    default: 'development',
    env: 'NODE_ENV',
  },
  debug: {
    env: 'DEBUG',
    format: String,
    default: 'app:*',
  },
  app: {
    name: {
      env: 'APPLICATION_NAME',
      format: String,
      default: null,
    },
    host: {
      env: 'APPLICATION_HOST',
      format: String,
      default: null,
    },
    port: {
      env: 'APPLICATION_PORT',
      format: 'port',
      default: 3000,
    },
  },
  idp: {
    host: {
      env: 'IDP_HOST',
      format: String,
      default: null,
    },
    tokenPath: {
      env: 'IDP_TOKEN_PATH',
      format: String,
      default: null,
    },
    clientId: {
      env: 'IDP_CLIENT_ID',
      format: String,
      default: null,
    },
    clientSecret: {
      env: 'IDP_CLIENT_SECRET',
      format: String,
      default: null,
      sensitive: true,
    },
  },
  timed: {
    host: {
      env: 'TIMED_HOST',
      format: String,
      default: null,
    },
    prefix: {
      env: 'TIMED_PREFIX',
      format: String,
      default: null,
    },
  },
  postgres: {
    host: {
      env: 'POSTGRES_HOST',
      format: String,
      default: null,
    },
    port: {
      env: 'POSTGRES_PORT',
      format: 'port',
      default: 5432,
    },
    username: {
      env: 'POSTGRES_USERNAME',
      format: String,
      default: null,
    },
    password: {
      env: 'POSTGRES_PASSWORD',
      format: String,
      default: null,
      sensitive: true,
    },
    database: {
      env: 'POSTGRES_DATABASE',
      format: String,
      default: null,
    },
  },
  redis: {
    host: {
      env: 'REDIS_HOST',
      format: String,
      default: null,
    },
    port: {
      env: 'REDIS_PORT',
      format: 'port',
      default: 6379,
    },
    password: {
      env: 'REDIS_PASSWORD',
      format: String,
      default: '',
      sensitive: true,
    },
  },
  smtp: {
    port: {
      env: 'SMTP_PORT',
      format: 'port',
      default: 587,
    },
    host: {
      env: 'SMTP_HOST',
      format: String,
      default: null,
    },
    secure: {
      env: 'SMTP_SECURE',
      format: Boolean,
      default: null,
    },
    requireTLS: {
      env: 'SMTP_REQUIRE_TLS',
      format: Boolean,
      default: null,
    },
    from: {
      env: 'SMTP_FROM',
      format: String,
      default: null,
    },
    to: {
      env: 'SMTP_TO',
      format: String,
      default: null,
    },
  },
  auth: {
    secret: {
      env: 'AUTH_SECRET',
      format: String,
      default: null,
      sensitive: true,
    },
    adminRole: {
      env: 'AUTH_ROLE_ADMIN',
      format: String,
      default: null,
    },
    employeeRole: {
      env: 'AUTH_ROLE_EMPLOYEE',
      format: String,
      default: null,
    },
    expirePassword: {
      env: 'AUTH_EXPIRE_PASSWORD',
      format: String,
      default: null,
    },
    userSearch: {
      base: {
        env: 'AUTH_USERS_SEARCH_BASE',
        format: String,
        default: null,
      },
      filter: {
        env: 'AUTH_USERS_SEARCH_FILTER',
        format: String,
        default: null,
      },
    },
    userGroupsearch: {
      base: {
        env: 'AUTH_USERS_GROUPSEARCH_BASE',
        format: String,
        default: null,
      },
      filter: {
        env: 'AUTH_USERS_GROUPSEARCH_FILTER',
        format: String,
        default: null,
      },
    },
    customerSearch: {
      base: {
        env: 'AUTH_CUSTOMERS_SEARCH_BASE',
        format: String,
        default: null,
      },
      filter: {
        env: 'AUTH_CUSTOMERS_SEARCH_FILTER',
        format: String,
        default: null,
      },
    },
    customerGroupsearch: {
      base: {
        env: 'AUTH_CUSTOMERS_GROUPSEARCH_BASE',
        format: String,
        default: null,
      },
      filter: {
        env: 'AUTH_CUSTOMERS_GROUPSEARCH_FILTER',
        format: String,
        default: null,
      },
    },
  },
  ldap: {
    host: {
      env: 'LDAP_HOST',
      format: String,
      default: null,
    },
    bindDn: {
      env: 'LDAP_BIND_DN',
      format: String,
      default: null,
    },
    bindCredentials: {
      env: 'LDAP_BIND_CREDENTIALS',
      format: String,
      default: null,
      sensitive: true,
    },
    cert: {
      env: 'LDAP_CERT',
      format: String,
      default: '',
      sensitive: true,
    },
  },
});

config.validate({ allowed: 'strict' });

export default config;
