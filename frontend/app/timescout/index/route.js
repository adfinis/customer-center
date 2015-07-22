import Ember from 'ember';

export default Ember.Route.extend({

  setupController(controller, model) {
    controller.set('model',    model)
  },

  model() {
    let params = { action: "history" }

    return $.getJSON('/api/proxy/timescout/service/api.php', params)
      .then(function(res){
        return res
      })
  }
});
