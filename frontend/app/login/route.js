import Ember from 'ember'
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin'

const { $ } = Ember

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  activate() {
    $('body').addClass('page-login')
  },
  deactivate() {
    $('body').removeClass('page-login')
  }
})
