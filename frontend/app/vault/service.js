import Ember  from 'ember'

/**
 * Vault service for fetching secrets
 *
 * @class VaultService
 * @public
 */
export default Ember.Service.extend({

  ajax: Ember.inject.service(),

  /**
   * Vault API requests
   *
   * @param {string} action The timescout API action
   * @param {Object} params Request query params
   * @param {string} type   Request type
   * @return {Promise}
   * @private
   */
  request() {
    return this.get('ajax').request('/api/proxy/vault/list')
  }
})
