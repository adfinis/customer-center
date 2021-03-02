import knex from 'knex';

import config from './convict';
import debug from './debug';

const pool = knex({
  client: 'pg',
  connection: {
    host: config.get('postgres.host'),
    port: config.get('postgres.port'),
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
});

pool.on('query', (data) =>
  debug.debug(`database: ${data.sql} ${JSON.stringify(data.bindings)}`)
);
pool.on('query-error', (error) => debug.error(`database: ${error.message}`));

export default pool;
