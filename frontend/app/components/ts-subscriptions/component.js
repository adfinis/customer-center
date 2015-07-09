import Ember from 'ember';

const { $ } = Ember

export default Ember.Component.extend({
  fetchData: Ember.on('init', function() {
    let params = {user: 'Fromarte', action: 'projects'}

    $.getJSON('/api/timescout/service/api.php', params)
      .then(res => this.set('model', res))
      .fail(xhr => this.set('error', xhr.responseText))
  })
});
