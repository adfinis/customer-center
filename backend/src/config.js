let config

if (process.env.NODE_ENV === 'testing') {
  config = require('../config-test.js')
} else {
  config = require('../config.js')
}

const tlsOptions = {}

if (config.ldap.url.startsWith('ldaps') && config.ldap.cert) {
  tlsOptions.ca = [require('fs').readFileSync(config.ldap.cert)]

  config.ldap.tlsOptions = tlsOptions
}

export default config
