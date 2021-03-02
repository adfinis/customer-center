import config from './app/convict';

const database = {
  client: 'pg',
  connection: {
    host: config.get('postgres.host'),
    user: config.get('postgres.username'),
    password: config.get('postgres.password'),
    database: config.get('postgres.database'),
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'migrations',
  },
};

module.exports = {
  development: database,
  testing: database,
  staging: database,
  production: database,
};
