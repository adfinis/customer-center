import Ember from 'ember'
import ajax  from 'ic-ajax'

const { on } = Ember

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

    ajax('/api/proxy/timescout/service/api.php', { data: params })
      .then(res => this.set('model', res))
      .catch(xhr => this.set('error', xhr.responseText))
  })
})
