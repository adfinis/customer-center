import Ember from 'ember'

const { RSVP } = Ember

export default Ember.Route.extend({

  vault: Ember.inject.service(),

  model({ path }) {
    return RSVP.hash({
      details: this.get('vault').details(path),
      path: RSVP.resolve(path.split('/'))
    })
  }

})
