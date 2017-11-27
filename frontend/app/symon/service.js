import Service, { inject as service } from '@ember/service'
import Host from 'adsycc/symon/host/model'

export const STATE_OK = 0
export const STATE_WARNING = 1
export const STATE_ERROR = 2

export default Service.extend({
  ajax: service(),

  /**
   * Symon service for fetching hosts and services
   *
   * @class SymonService
   * @param {Object} params Query params
   * @private
   */
  request(params) {
    return this.get('ajax').request('/api/proxy/symon/hosts', { data: params })
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
})
