import Ember from 'ember'
import AjaxService from 'ember-ajax/services/ajax'

export default AjaxService.extend({
  session: Ember.inject.service(),

  // can this be simplified??
  headers: Ember.computed('session.session.content.authenticated.data.token', {
    get() {
      const token = this.get('session.session.content.authenticated.data.token')
      return token ? { 'X-Authorization': token } : {}
    }
  })
})
