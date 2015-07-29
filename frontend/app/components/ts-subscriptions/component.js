import Ember from 'ember'

const { $, on } = Ember

/**
 * Timescout component
 *
 * @class TimescoutComponent
 * @public
 */
export default Ember.Component.extend({

  /**
   * API action to perform
   *
   * @property {string} apiAction
   * @public
   */
  apiAction: 'projects',

  /**
   * Fetch the timescout data
   *
   * @return {void}
   */
  fetchData: on('init', function() {
    let params = { action: this.get('apiAction') }

    $.getJSON('/api/proxy/timescout/service/api.php', params)
      .then(res => this.set('model', res))
      .fail(xhr => this.set('error', xhr.responseText))
  })
})
