import { inject as service } from '@ember/service'
import Route from '@ember/routing/route'

/**
 * Symon route
 *
 * @class SymonRoute
 * @public
 */
export default Route.extend({
  /**
   * Symon service to fetch SyMonitoring hosts
   *
   * @property {SymonHosts} symon
   * @public
   */
  symon: service(),

  /**
   * Returns the symon hosts
   *
   * @param {Object} params Query params to fetch symon hosts
   * @return {Hosts}
   */
  model() {
    return this.get('symon').fetchHosts()
  }
})
