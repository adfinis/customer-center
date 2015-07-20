import Ember from 'ember'

export default Ember.Component.extend({
  init(...args) {
    this._super(...args)

    Ember.$.getJSON('/api/rt/tickets')
      .then(res => this.set('model', res))
  }
})
