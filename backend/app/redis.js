import redis from 'redis';

import config from './convict';

const options = {
  host: config.get('redis.host'),
  port: config.get('redis.port'),
};

if (config.get('redis.password')) {
  options.password = config.get('redis.password');
}

export default redis.createClient(options);
