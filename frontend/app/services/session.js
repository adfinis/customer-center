import { inject as service } from '@ember/service'
import { computed } from '@ember/object'
import Session from 'ember-simple-auth/services/session'
import * as Sentry from '@sentry/browser'

export default Session.extend({
  session: service(),
  ajax: service(),
  store: service(),

  user: computed(function() {
    return this.ajax.request('/api/v1/users/current').then(res => {
      this.store.pushPayload(res)

      let { data: { id, attributes: { username, email, groups } } } = res

      Sentry.configureScope(scope => {
        scope.setUser({
          id,
          username,
          email,
          groups: groups.join(', ')
        })
      })
      return this.store.peekRecord('user', id)
    })
  })
})
