import Ember from 'ember';

const { inject } = Ember

/**
 * Symon route
 *
 * @class SymonRoute
 * @public
 */
export default Ember.Route.extend({

  /**
   * Symon service to fetch SyMonitoring hosts
   *
   * @property {SymonHosts} symon
   * @public
   */
  symon: inject.service(),

  /**
   * Returns the symon hosts
   *
   * @param {Object} params Query params to fetch symon hosts
   * @return {Hosts}
   */
  model() {
    return this.get('symon').fetchHosts()
  }
});
