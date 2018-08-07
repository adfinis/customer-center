import Component from '@ember/component'
import { task } from 'ember-concurrency'
import { inject as service } from '@ember/service'

export default Component.extend({
  store: service(),

  init() {
    this._super(...arguments)
    this.fetchTickets.perform()
  },

  fetchTickets: task(function*() {
    return yield this.store.query('rt-ticket', {
      page_size: 3,
      page: 1
    })
  })
})
