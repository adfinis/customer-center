import Route from '@ember/routing/route'

/**
 * User route
 *
 * @class UserRoute
 * @public
 */
export default Route.extend({
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
