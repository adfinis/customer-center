import Ember   from 'ember'
import ajax    from 'ic-ajax'
import Session from 'simple-auth/session'
import User    from 'adsycc/user/model'

const { computed } = Ember

export default Session.extend({
  user: computed(async function() {
    let res  = await ajax('/api/v1/user/current', { dataType: 'text' })
    let user = User.create(JSON.parse(res).data.user)
    user.set('__rollback', res)
    this.set('user', user)
    return user
  })
})
