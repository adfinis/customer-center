import Ember from 'ember';

const { $ } = Ember

export default Ember.Component.extend({
  apiAction: 'projects',
  fetchData: Ember.on('init', function() {
    let params = { user: this.get('user'), action: this.get('apiAction') }

    $.getJSON('/api/proxy/timescout/service/api.php', params)
      .then(res => this.set('model', res))
      .fail(xhr => this.set('error', xhr.responseText))
  })
});
