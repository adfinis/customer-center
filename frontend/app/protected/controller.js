import Controller from '@ember/controller'
import { inject as service } from '@ember/service'
import moment from 'moment'
import { task } from 'ember-concurrency'

export default Controller.extend({
  i18n: service(),
  ajax: service(),

  setLocale: task(function*(locale) {
    this.set('model.language', locale)
    this.set('i18n.locale', locale)

    moment.locale(locale)

    // Setting html locale to support hyphenation
    document.documentElement.lang = locale

    yield this.ajax.request('/api/v1/users/current', {
      method: 'put',
      data: this.model.serialize()
    })
  })
})
