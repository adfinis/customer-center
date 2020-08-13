import Controller from '@ember/controller'
import { computed } from '@ember/object'
import { inject as service } from '@ember/service'

export default Controller.extend({
  router: service(),
  detail: computed('router.currentRouteName', function() {
    return this.get('router.currentRouteName') == 'vault.edit'
  })
})
