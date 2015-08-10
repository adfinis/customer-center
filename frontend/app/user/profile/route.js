import Ember from 'ember'
import ajax  from 'ic-ajax'

const { inject, on } = Ember

/**
 * User profile route
 *
 * @class UserProfileRoute
 * @public
 */
export default Ember.Route.extend({

  /**
   * Session service
   *
   * @property {Session} session
   * @public
   */
  session: inject.service(),

  /**
   * The user model
   *
   * @return {User}
   */
  async model() {
    let user = this.modelFor('protected')
    let res  = await ajax('/api/v1/user/current')

    user.setProperties(res.data.user)

    return user
  },

  /**
   * Rollback any unsaved user changes on route deactivation
   *
   * @return {void}
   */
  rollbackUser: on('deactivate', function() {
    this.modelFor('user.profile').rollback()
  })
})
