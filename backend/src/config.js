import fs from 'fs'

const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`))
const tlsOptions = {}

if (config.ldap.url.startsWith('ldaps') && config.ldap.cert) {
  tlsOptions.ca = [require('fs').readFileSync(config.ldap.cert)]

  config.ldap.tlsOptions = tlsOptions
}

export default config
