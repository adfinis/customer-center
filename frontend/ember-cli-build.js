/* global require, module */

const EmberApp = require('ember-cli/lib/broccoli/ember-app')

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: ['node_modules']
    },
    babel: {
      optional: ['es7.asyncFunctions', 'es7.decorators'],
      sourceMaps: 'inline'
    }
  })

  app.import('node_modules/moment/locale/de.js')

  return app.toTree()
}
