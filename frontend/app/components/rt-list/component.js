import Ember from 'ember'

export default Ember.Component.extend({
  init(...args) {
    this._super(...args)

    Ember.$.getJSON('/api/rt/tickets')
      .then(res => {
        res.data.tickets.forEach(t =>
          t.status = `${t.status[0].toUpperCase()}${t.status.slice(1)}`
        )

        return res
      })
      .then(res => this.set('model', res))
  }
})
