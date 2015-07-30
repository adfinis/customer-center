import Ember  from 'ember'
import moment from 'moment'

const { $ } = Ember

/**
 * Initializer for locale
 *
 * @param {Ember.Application} instance The adsycc instance
 * @return {void}
 */
export function initialize(instance) {
  let locale = getNavigatorLanguage()

  if (locale.includes('-')) {
    locale = locale.split('-')[0]
  }

  if (locale.includes('_')) {
    locale = locale.split('_')[0]
  }

  if (locale) {
    setLocale(instance.container.lookup('service:i18n'), locale)
  }
}

/**
 * Set the locale
 *
 * @param {EmberI18nService} i18n The ember-i18n service
 * @param {string} locale The locale to set
 * @return {void}
 */
function setLocale(i18n, locale) {
  if (i18n.get('locales').includes(locale)) {
    moment.locale(locale)
    i18n.set('locale', locale)
    // Setting html locale to support hyphenation
    $('html').attr('lang', locale)
  }
}

/**
 * Get the browser language
 *
 * @return {string}
 */
function getNavigatorLanguage() {
  let navigator = window.navigator
  let locale    = navigator.languages ? navigator.languages[0] : null

  return locale || navigator.language || navigator.browserLanguage || navigator.userLanguage
}

export default {
  name: 'locale',
  after: 'ember-i18n',
  initialize
}
