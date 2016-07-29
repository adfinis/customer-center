import Ember   from 'ember'
import Session from 'ember-simple-auth/services/session'
import User    from 'adsycc/user/model'

const { computed } = Ember

export default Session.extend({
  session: Ember.inject.service(),
  ajax: Ember.inject.service(),

  user: computed(async function() {
    const res = await this.get('ajax').request('/api/v1/user/current', { dataType: 'text' })
    let user = User.create(JSON.parse(res).data.user)
    user.set('__rollback', res)
    this.set('user', user)
    return user
  })
})
