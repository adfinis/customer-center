import Ember from 'ember'
import ajax  from 'ic-ajax'

const { computed, observer } = Ember

export default Ember.Component.extend({
  limit: 1,
  offset: 0,
  total: 0,

  init(...args) {
    this._super(...args)
    this.send('updateModel')
  },

  page: computed('limit', 'offset', {
    get() {
      return Math.max(1, this.get('offset') / this.get('limit'))
    },
    set(key, value) {
      this.set('offset', this.get('limit') * (value - 1))

      return value
    }
  }),

  totalPages: computed('limit', 'total', function() {
    return Math.ceil(this.get('total') / this.get('limit'))
  }),

  showPager: computed('totalPages', function() {
    return this.get('totalPages') > 1
  }),

  updateTickets: observer('limit', 'offset', function() {
    this.send('updateModel')
  }),

  actions: {
    updateModel() {
      let limit  = this.get('limit')
      let offset = this.get('offset')
      let emails = this.get('emails')

      this.set('error', null)

      ajax('/api/rt/tickets', { data: { emails, limit, offset } })
        .then(res => {
          res.data.tickets.forEach(t =>
            t.status = `${t.status[0].toUpperCase()}${t.status.slice(1)}`
          )

          this.set('total', res.data.total)
          this.set('model', res)
        })
        .catch(xhr =>
          this.set('error', xhr.responseJSON || xhr.responseText)
        )
    }
  }
})
