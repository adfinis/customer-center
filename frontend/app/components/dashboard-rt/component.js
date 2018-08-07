import Component from '@ember/component'
import { task } from 'ember-concurrency'
import { computed } from '@ember/object'
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
  }),

  tickets: computed(
    'fetchTickets.{isRunning,lastSuccessful.value}',
    function() {
      if (this.fetchTickets.lastSuccessful) {
        return this.fetchTickets.lastSuccessful.value
      }
      return
    }
  ),

  statistics: computed('tickets', function() {
    return this.tickets && this.tickets.meta.statistics
  })
})
