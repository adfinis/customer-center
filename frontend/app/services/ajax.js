import { computed } from '@ember/object'
import { inject as service } from '@ember/service'
import AjaxService from 'ember-ajax/services/ajax'

export default AjaxService.extend({
  session: service(),

  headers: computed('session.data.token', {
    get() {
      let headers = {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      }

      let token = this.get('session.data.authenticated.data.token')

      let auth = token
        ? {
            'X-Authorization': token
          }
        : {}

      return Object.assign(headers, auth)
    }
  }),

  isUnauthorizedError(code) {
    if (code === 401 && this.get('session.isAuthenticated')) {
      this.session.invalidate()
    }
  }
})
