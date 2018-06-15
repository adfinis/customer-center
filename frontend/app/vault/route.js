import { inject as service } from '@ember/service'
import Route from '@ember/routing/route'

export default Route.extend({
  vault: service(),

  model() {
    return this.vault.list()
  }
})
