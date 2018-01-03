import { inject as service } from '@ember/service'
import Route from '@ember/routing/route'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

/**
 * Protected route, allows access only to authenticated users
 *
 * @class ProtectedRoute
 * @public
 */
export default Route.extend(AuthenticatedRouteMixin, {
  /**
   * Session service, we use the session user for our protected model
   *
   * @property {Session} session
   * @public
   */
  session: service(),

  /**
   * I18n service to set the user locale
   *
   * @property {EmberI18n} i18n
   * @public
   */
  i18n: service(),

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
    let lang = user.get('lang')

    if (lang && lang !== this.get('i18n.locale')) {
      this.set('i18n.locale', lang)
    }
  },

  actions: {
    invalidateSession() {
      this.get('session').invalidate()
    }
  }
})
