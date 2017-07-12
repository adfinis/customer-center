import Ember from 'ember'

/**
 * User route
 *
 * @class UserRoute
 * @public
 */
export default Ember.Route.extend({
  /**
   * User route model
   *
   * @return {User}
   * @public
   */
  model() {
    return this.get('session.user')
  }
})
