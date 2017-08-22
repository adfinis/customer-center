import fs from 'fs'
import config from '../config'

const tlsOptions = {}

if (config.ldap.url.startsWith('ldaps') && config.ldap.cert) {
  tlsOptions.ca = [require('fs').readFileSync(config.ldap.cert)]

  config.ldap.tlsOptions = tlsOptions
}

export default config
