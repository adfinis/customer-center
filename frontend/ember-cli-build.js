/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app')

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    babel: {
      optional: [ 'es7.asyncFunctions', 'es7.decorators' ]
    },
    hinting: false
  })

  app.import('vendor/babel-polyfill.js', { prepend: true })
  app.import('bower_components/moment/locale/de.js')

  return app.toTree()
}
