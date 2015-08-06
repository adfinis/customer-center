import Ember from 'ember'
import ajax  from 'ic-ajax'

export default Ember.Service.extend({

  /**
   * Symon service for fetching hosts and services
   *
   * @class SymonService
   * @private
   */
  request(params) {
    let data = Object.assign({}, params)

    return ajax('/api/symon/hosts', { data })
  },

  /**
   * Fetch symon hosts
   *
   * @return {Object}
   * @public
   */
  fetchHosts() {
    return this.request()
  }
});
