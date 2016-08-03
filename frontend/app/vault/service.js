import Ember  from 'ember'

/**
 * Vault service for fetching secrets
 *
 * @class VaultService
 * @public
 */
export default Ember.Service.extend({

  ajax: Ember.inject.service(),

  list() {
    return this.get('ajax').request('/api/vault/list')
  },

  details(path) {
    return this.get('ajax').request(`/api/proxy/vault/${path}`)
  }

})
