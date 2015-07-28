import Ember from 'ember'
import User from 'adsycc/user/model'
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  async model() {
    let { data: { user } } = await Ember.$.getJSON('/api/v1/user/current')

    return User.create(user)
  }
})
