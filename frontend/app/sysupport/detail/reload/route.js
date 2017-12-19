import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'

export default Route.extend({
  notify: service(),
  i18n: service(),

  model() {
    return this.store.findAll('timed-subscription-package')
  },

  actions: {
    subscribe(subscriptionPackage) {
      let order = {
        duration: subscriptionPackage.get('duration'),
        project: this.modelFor('sysupport/detail')
      }
      this.store.createRecord('timed-subscription-order', order).save()
      this.get('notify').success(this.get('i18n').t('sysupport.reload.success'))
    }
  }
})
