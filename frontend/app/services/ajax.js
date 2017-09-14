import Ember from 'ember'
import AjaxService from 'ember-ajax/services/ajax'

export default AjaxService.extend({
  session: Ember.inject.service(),

  headers: Ember.computed('session.data.token', {
    get() {
      const token = this.get('session.data.authenticated.data.token')
      return token ? { 'X-Authorization': token } : {}
    }
  }),

  isUnauthorizedError() {
    this.get('session').invalidate()
  }
})
