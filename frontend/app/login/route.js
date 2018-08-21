import Route from '@ember/routing/route'
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin'

export default Route.extend(UnauthenticatedRouteMixin, {
  routeIfAlreadyAuthenticated: '/',

  activate() {
    document.body.classList.add('login')
  },
  deactivate() {
    document.body.classList.remove('login')
  }
})
