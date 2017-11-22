import { inject as service } from '@ember/service'
import Route from '@ember/routing/route'
import { translationMacro as t } from 'ember-i18n'

export default Route.extend({
  redmine: service(),
  i18n: service(),

  errorName: t('redmine.error'),
  errorDetails: t('redmine.error-noprojects'),

  model() {
    return this.get('redmine').fetchProjects({ limit: 1 })
  },

  afterModel(model) {
    if (!model.total) {
      return Promise.reject({
        textStatus: this.get('errorName'),
        errorThrown: this.get('errorDetails')
      })
    }
  }
})
