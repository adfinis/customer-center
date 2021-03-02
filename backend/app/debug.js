import debug from 'debug';

let counters = {};

export default {
  debug: debug('app:debug'),
  log: debug('app:log'),
  info: debug('app:info'),
  warn: debug('app:warn'),
  error: debug('app:error'),

  assert(assertion, ...args) {
    if (!assertion) {
      this.error(...args);
    }
  },

  count(label = 'default') {
    counters[label] = (counters[label] || 0) + 1;
    this.log('%s: %s', label, counters[label]);
  },

  countReset(label = 'default') {
    counters[label] = 0;
    this.log('%s: %s', label, counters[label]);
  },
};
