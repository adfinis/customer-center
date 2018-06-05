import { inject as service } from '@ember/service'
import Route from '@ember/routing/route'

export default Route.extend({
  vault: service(),

  model() {
    return this.get('vault').list()
  },

  actions: {
    willTransition(transition) {
      if (transition.targetName === 'vault.index.index') {
        this.set('controller.detail', false)
      } else if (transition.targetName === 'vault.index.edit') {
        this.set('controller.detail', true)
      }
    }
  }
})
