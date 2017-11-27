import Service, { inject as service } from '@ember/service'

export default Service.extend({
  ajax: service(),

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
    return this.get('ajax').post(`/api/proxy/vault/${path}`, {
      data: JSON.stringify(data)
    })
  }
})
