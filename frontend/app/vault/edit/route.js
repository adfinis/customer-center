import Ember from 'ember'

const { RSVP } = Ember

export default Ember.Route.extend({

  vault: Ember.inject.service(),

  model({ path }) {
    return RSVP.hash({
      details: this.get('vault').details(path),
      path: RSVP.resolve(path.split('/')),
      rawPath: path
    })
  },

  actions: {

    async save(secrets) {
      const path = this.modelFor(this.routeName).rawPath
      await this.get('vault').del(path)
      this.get('vault').save(path, secrets)
    },

    async deleteNode() {
      const path = this.modelFor(this.routeName).rawPath
      await this.get('vault').del(path)
      this.transitionTo('vault')
    }
  }
})
