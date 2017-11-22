import { inject as service } from '@ember/service'
import { computed } from '@ember/object'
import Session from 'ember-simple-auth/services/session'
import User from 'adsycc/user/model'

export default Session.extend({
  session: service(),
  ajax: service(),

  user: computed(async function() {
    const res = await this.get('ajax').request('/api/v1/user/current', {
      dataType: 'text'
    })
    let user = User.create(JSON.parse(res).data.user)
    user.set('__rollback', res)
    return user
  })
})
