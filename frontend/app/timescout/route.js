import Ember from 'ember'
import ajax  from 'ic-ajax'

export default Ember.Route.extend({

  model() {
    let params = { action: 'projects' }

    return ajax('/api/proxy/timescout/service/api.php', { data: params })
  }
})
