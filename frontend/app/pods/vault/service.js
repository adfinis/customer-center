import Service, { inject as service } from '@ember/service'

export default Service.extend({
  ajax: service(),

  list() {
    return this.ajax.request('/api/vault/list')
  },

  details(path) {
    return this.ajax.request(`/api/vault/get/${path}`)
  },

  del(path) {
    return this.ajax.del(`/api/proxy/vault/${path}`)
  },

  save(path, data) {
    return this.ajax.post(`/api/proxy/vault/${path}`, {
      data: { data }
    })
  }
})
