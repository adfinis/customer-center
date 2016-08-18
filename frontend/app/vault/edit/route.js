import Ember from 'ember'

const { RSVP } = Ember

export default Ember.Route.extend({

  vault: Ember.inject.service(),

  notify: Ember.inject.service(),

  model({ path }) {
    return RSVP.hash({
      details: this.get('vault').details(path),
      path: RSVP.resolve(path.split('/')),
      rawPath: path
    })
  },

  actions: {

    async saveMeta(data) {
      const path = this.modelFor(this.routeName).rawPath
      try {
        await this.get('vault').saveMeta(path, data)
        this.get('notify').success('Node was saved.')
      }
      catch (e) {
        this.get('notify').error(e.message)
      }
    },

    async save(secrets) {
      const path = this.modelFor(this.routeName).rawPath
      try {
        await this.get('vault').del(path)
        await this.get('vault').save(path, secrets)

        this.get('notify').success('Node was saved.')
      }
      catch (e) {
        this.get('notify').error(e.message)
      }
    },

    async deleteNode() {
      const path = this.modelFor(this.routeName).rawPath
      await this.get('vault').del(path)
      this.get('notify').success('Node was deleted.')
      this.transitionTo('vault')
    }
  }
})
