import Ember from 'ember'
import ajax  from 'ic-ajax'
import Host from 'adsycc/symon/host/model'

export default Ember.Service.extend({

  /**
   * Symon service for fetching hosts and services
   *
   * @class SymonService
   * @private
   */
  request(params) {
    let data = Object.assign({}, params)

    return ajax('/api/proxy/symon/hosts', { data })
  },

  /**
   * Fetch symon hosts
   *
   * @return {Object}
   * @public
   */
  async fetchHosts() {
    let hosts = await this.request()

    hosts.data.hosts = hosts.data.hosts.map(h => Host.create(h))

    return hosts
  }
});
