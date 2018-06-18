const config = require(process.env.NODE_ENV === 'testing'
  ? '../config-test.js'
  : '../config.js')

const tlsOptions = {}

if (config.ldap.url.startsWith('ldaps') && config.ldap.cert) {
  tlsOptions.ca = [require('fs').readFileSync(config.ldap.cert)]

  config.ldap.tlsOptions = tlsOptions
}

export default config
