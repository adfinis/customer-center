/* global require, module */

const EmberApp = require('ember-cli/lib/broccoli/ember-app')
const broccoliAssetRevDefaults = require('broccoli-asset-rev/lib/default-options')

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    flatpickr: {
      locales: ['de']
    },
    fingerprint: {
      extensions: broccoliAssetRevDefaults.extensions.concat(['svg']) //add svg extension
    },
    sassOptions: {
      includePaths: ['node_modules']
    },
    babel: {
      plugins: ['@babel/plugin-proposal-object-rest-spread']
    }
  })

  app.import('node_modules/moment/locale/de.js')
  app.import('node_modules/@sentry/browser/dist/index.js', {
    using: [{ transformation: 'cjs', as: '@sentry/browser' }]
  })

  return app.toTree()
}
