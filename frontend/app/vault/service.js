import Ember  from 'ember'

function jsonify(data) {
  return {
    contentType: 'application/json',
    data: JSON.stringify(data)
  }
}


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
    return this.get('ajax').request(`/api/vault/get/${path}`)
  },

  del(path) {
    return this.get('ajax').del(`/api/proxy/vault/${path}`)
  },

  save(path, data) {
    return this.get('ajax').post(`/api/proxy/vault/${path}`, jsonify(data))
  },

  saveMeta(path, data) {
    return this.get('ajax').post(`/api/vault/meta/${path}`, jsonify(data))
  }
})
