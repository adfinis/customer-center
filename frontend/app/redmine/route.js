import Ember from 'ember'
import { translationMacro as t } from 'ember-i18n'

const { inject } = Ember

export default Ember.Route.extend({
  redmine: inject.service(),
  i18n:    inject.service(),

  errorName:    t('redmine.error'),
  errorDetails: t('redmine.error-noprojects'),

  model() {
    return this.get('redmine').fetchProjects({ limit: 1 })
  },

  afterModel(model) {
    if (!model.total) {
      return Promise.reject({
        textStatus:  this.get('errorName'),
        errorThrown: this.get('errorDetails')
      })
    }
  }
})
