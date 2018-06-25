import { inject as service } from '@ember/service'
import { computed } from '@ember/object'
import Session from 'ember-simple-auth/services/session'

export default Session.extend({
  session: service(),
  ajax: service(),
  store: service(),

  user: computed(function() {
    return this.ajax.request('/api/v1/users/current').then(res => {
      this.store.pushPayload(res)

      let { data: { id } } = res

      return this.store.peekRecord('user', id)
    })
  })
})
