import Application from '@ember/application'
import Resolver from 'ember-resolver'
import loadInitializers from 'ember-load-initializers'
import config from './config/environment'
import RSVP from 'rsvp'
import * as Sentry from '@sentry/browser'

window.Promise = RSVP.Promise
window.NativePromise = window.Promise

if (config.SENTRY) {
  Sentry.init({
    ...config.SENTRY,
    integrations: [new Sentry.Integrations.Ember()],
    beforeSend(event, hint) {
      const exception = hint.originalException
      if (
        exception &&
        Array.isArray(exception.errors) &&
        exception.errors.every(e => e.status === 401)
      ) {
        event.level = 'info'
      }

      if (
        config.SENTRY_IGNORE &&
        config.SENTRY_IGNORE.includes(hint.originalException.name)
      ) {
        return null
      }
      return event
    }
  })
}

let App

App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
})

loadInitializers(App, config.modulePrefix)

export default App
