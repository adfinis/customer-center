var config = require('./config.json').database

module.exports = {

  development: config,
  staging: config,
  production: config

}
