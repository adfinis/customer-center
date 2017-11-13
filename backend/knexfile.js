import config from './src/config'

const { database } = config

module.exports = {
  development: database,
  testing: database,
  staging: database,
  production: database
}
