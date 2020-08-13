import fs from 'fs';

const config = require(process.env.NODE_ENV === 'testing'
  ? '../config-test.js'
  : '../config.js');

if (config.ldap.url.startsWith('ldaps') && config.ldap.cert) {
  const ca = [fs.readFileSync(config.ldap.cert)];
  config.ldap.tlsOptions = { ca };
}

export default config;
