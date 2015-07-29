import Ember from 'ember'

const { $, on } = Ember

export default Ember.Component.extend({
  apiAction: 'projects',
  fetchData: on('init', function() {
    let params = { action: this.get('apiAction') }

    $.getJSON('/api/proxy/timescout/service/api.php', params)
      .then(res => this.set('model', res))
      .fail(xhr => this.set('error', xhr.responseText))
  })
})
