/* global require, module */

const EmberApp = require('ember-cli/lib/broccoli/ember-app')

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    babel: {
      optional: ['es7.asyncFunctions', 'es7.decorators']
    }
  })

  app.import('vendor/babel-polyfill.js', { prepend: true })
  app.import('bower_components/moment/locale/de.js')

  return app.toTree()
}
