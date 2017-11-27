import { inject as service } from '@ember/service'
import Route from '@ember/routing/route'
import { on } from '@ember/object/evented'

/**
 * User profile route
 *
 * @class UserProfileRoute
 * @public
 */
export default Route.extend({
  /**
   * Session service
   *
   * @property {Session} session
   * @public
   */
  session: service(),

  /**
   * Ajax service
   *
   * @property {Ajax} ajax
   * @public
   */
  ajax: service(),

  /**
   * The user model
   *
   * @return {User}
   */
  async model() {
    let user = this.modelFor('protected')
    let res = await this.get('ajax').request('/api/v1/user/current')

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
