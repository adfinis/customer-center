import { inject as service } from '@ember/service'
import Route from '@ember/routing/route'
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin'

export default Route.extend(ApplicationRouteMixin, {
  session: service(),

  setupController(controller) {
    controller.set('session', this.get('session'))
  }
})
