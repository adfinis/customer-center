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
      data: JSON.stringify(data),
      headers: {
        //Since were blocking any post data in the backend proxy were sending it as formdata.
        //my guess is that the backend does not know how to parse it and because of that just ignores it.
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
})
