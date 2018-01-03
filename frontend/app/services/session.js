import { inject as service } from '@ember/service'
import { computed } from '@ember/object'
import Session from 'ember-simple-auth/services/session'

export default Session.extend({
  session: service(),
  ajax: service(),
  store: service(),

  user: computed(async function() {
    let res = await this.get('ajax').request('/api/v1/users/current')

    await this.get('store').pushPayload(res)

    let { data: { id } } = res

    return this.get('store').peekRecord('user', id)
  })
})
