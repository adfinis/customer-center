import Ember from 'ember'
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin'

const { inject } = Ember

/**
 * Protected route, allows access only to authenticated users
 *
 * @class ProtectedRoute
 * @public
 */
export default Ember.Route.extend(AuthenticatedRouteMixin, {

  /**
   * Session service, we use the session user for our protected model
   *
   * @property {Session} session
   * @public
   */
  session: inject.service(),

  /**
   * I18n service to set the user locale
   *
   * @property {EmberI18n} i18n
   * @public
   */
  i18n: inject.service(),

  /**
   * The user model
   *
   * @return {Promise.<User>}
   */
  model() {
    return this.get('session.user')
  },

  /**
   * After we loaded our user, set the application locale
   *
   * @param {User} user The session user
   * @return {void}
   */
  afterModel(user) {
    if (user.language && user.language !== this.get('i18n.locale')) {
      this.set('i18n.locale', user.language)
    }
  }
})
