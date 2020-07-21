import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'
import { hash, resolve } from 'rsvp'

export default Route.extend({
  vault: service(),

  notify: service(),

  i18n: service(),

  model({ path }) {
    return hash({
      details: this.vault.details(path),
      path: resolve(path.split('/')),
      rawPath: path
    })
  },

  actions: {
    async save(secrets) {
      const path = this.modelFor(this.routeName).rawPath
      try {
        await this.vault.save(path, secrets)

        this.notify.success(this.i18n.t('vault.save-success'))
      } catch (e) {
        this.notify.error(e.message)
      }
    },

    loading(transition) {
      if (this.controller) {
        this.controller.set('isLoading', true)

        if (transition) {
          transition.promise.finally(() => {
            this.controller.set('isLoading', false)
          })
        }
      }
      return false
    }
  }
})
