import Ember from 'ember'

const { RSVP } = Ember

export default Ember.Route.extend({

  vault: Ember.inject.service(),

  notify: Ember.inject.service(),

  i18n: Ember.inject.service(),

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
        this.get('notify').success(this.get('i18n').t('vault.save-success'))
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

        this.get('notify').success(this.get('i18n').t('vault.save-success'))
      }
      catch (e) {
        this.get('notify').error(e.message)
      }
    }

  }
})
