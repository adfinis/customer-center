import { computed } from '@ember/object'
import { inject as service } from '@ember/service'
import AjaxService from 'ember-ajax/services/ajax'

export default AjaxService.extend({
  session: service(),

  headers: computed('session.data.token', {
    get() {
      const token = this.get('session.data.authenticated.data.token')
      return token ? { 'X-Authorization': token } : {}
    }
  }),

  isUnauthorizedError() {
    this.get('session').invalidate()
  }
})
