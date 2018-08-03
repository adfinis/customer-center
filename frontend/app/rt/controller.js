import Controller from '@ember/controller'
import { computed } from '@ember/object'

import ENV from 'customer-center/config/environment'

export default Controller.extend({
  queryParams: [
    {
      page: { type: 'number' },
      page_size: { type: 'number' },
      search: { type: 'string' },
      status: { type: 'string' }
    }
  ],

  init() {
    this._super(...arguments)
    this.set('pageSizes', ENV.APP.rt.pageSizes)
    this.set('states', ENV.APP.rt.states)
    this.set('term', this.search)
  },

  pageSize: computed('page_size', function() {
    return this.page_size || 10
  }),

  actions: {
    loadPage(page) {
      this.set('page', page)
    },
    setPageSize(page_size) {
      this.setProperties({ page: 1, page_size })
    },
    search() {
      this.set('search', this.term || null)
    },
    setState(status) {
      this.set('status', status || null)
    }
  }
})
