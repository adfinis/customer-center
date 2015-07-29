import Ember from 'ember'
import ajax  from 'ic-ajax'

export default Ember.Route.extend({

  setupController(controller, model) {
    controller.set('model', model)
  },

  model() {
    let params = { action: 'history' }

    return ajax('/api/proxy/timescout/service/api.php', { data: params })
  }
})
