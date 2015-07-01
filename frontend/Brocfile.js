/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app')
var funnel   = require('broccoli-funnel')

var app = new EmberApp({
  babel: {
    optional: [ 'es7.asyncFunctions', 'es7.decorators' ]
  }
})

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

app.import('vendor/babel-polyfill.js', { prepend: true })

app.import('bower_components/adcssy/build/css/adcssy.css')

var adcssyAssets = funnel('bower_components/adcssy/build', {
  srcDir: '/',
  include: [ 'fonts/*', 'pictures/**/*' ],
  destDir: '/'
})

module.exports = app.toTree(adcssyAssets)
