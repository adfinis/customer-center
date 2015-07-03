import moment from 'moment'

export function initialize(instance) {
  let locale = getNavigatorLanguage()

  if (locale.includes('-')) {
    locale = locale.split('-')[0]
  }

  if (locale.includes('_')) {
    locale = locale.split('_')[0]
  }

  if (locale) {
    let i18n = instance.container.lookup('service:i18n')

    if (i18n.get('locales').includes(locale)) {
      moment.locale(locale)
      instance.container.lookup('service:i18n').set('locale', locale)
    }
  }
}

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
