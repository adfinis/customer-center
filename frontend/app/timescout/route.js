import Ember from 'ember';

const { $ } = Ember

export default Ember.Route.extend({

  model() {
    let params = { user: 'Fromarte', action: 'projects' }

    return $.getJSON('/api/proxy/timescout/service/api.php', params)
  }
});
