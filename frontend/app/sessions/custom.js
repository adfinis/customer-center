import Ember   from 'ember'
import Session from 'simple-auth/session'
import User    from 'adsycc/user/model'

const { $, computed } = Ember

export default Session.extend({
  user: computed(async function() {
    let res  = await $.getJSON('/api/v1/user/current')
    let user = User.create(res.data.user)
    this.set('user', user)
    return user
  })
})
