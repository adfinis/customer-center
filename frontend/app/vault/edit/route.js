import { inject as service } from '@ember/service'
import Route from '@ember/routing/route'
import RSVP from 'rsvp'

export default Route.extend({
  vault: service(),

  notify: service(),

  i18n: service(),

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
      try {
        await this.get('vault').del(path)
        await this.get('vault').save(path, secrets)

        this.get('notify').success(this.get('i18n').t('vault.save-success'))
      } catch (e) {
        this.get('notify').error(e.message)
      }
    }
  }
})
