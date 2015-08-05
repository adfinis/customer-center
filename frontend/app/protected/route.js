import Ember from 'ember'
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin'

const { inject } = Ember

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: inject.service(),
  i18n:    inject.service(),

  model() {
    return this.get('session.user')
  },

  afterModel(user) {
    if (user.language && user.language !== this.get('i18n.locale')) {
      this.set('i18n.locale', user.language)
    }
  }
})
