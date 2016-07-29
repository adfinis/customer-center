import Ember from 'ember'

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
   * Ajax service
   *
   * @property {Ajax} ajax
   * @public
   */
  ajax: inject.service(),

  /**
   * The user model
   *
   * @return {User}
   */
  async model() {
    let user = this.modelFor('protected')
    let res  = await this.get('ajax').request('/api/v1/user/current')

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
