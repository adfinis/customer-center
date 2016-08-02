import Ember from 'ember'

export default Ember.Route.extend({

  vault: Ember.inject.service(),

  model() {
    return this.get('vault').request()
  }
})
