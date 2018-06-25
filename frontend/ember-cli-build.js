/* global require, module */

const EmberApp = require('ember-cli/lib/broccoli/ember-app')
const broccoliAssetRevDefaults = require('broccoli-asset-rev/lib/default-options')

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    fingerprint: {
      extensions: broccoliAssetRevDefaults.extensions.concat(['svg']), //add svg extension
      prepend: '/ember-mdi/' //if do you have rootURL use `prepend` option
    },
    sassOptions: {
      includePaths: ['node_modules']
    },
    babel: {
      optional: ['es7.asyncFunctions', 'es7.decorators']
    }
  })

  app.import('node_modules/moment/locale/de.js')

  return app.toTree()
}
