const config = require('./config.js').database

module.exports = {
  development: config,
  staging: config,
  production: config
}
