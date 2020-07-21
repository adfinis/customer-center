import debug from 'debug';

export default {
  log: debug('app:log'),
  info: debug('app:info'),
  error: debug('app:error')
};
