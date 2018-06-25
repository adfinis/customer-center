import Controller from '@ember/controller'
import { inject as service } from '@ember/service'

export default Controller.extend({
  i18n: service(),
  notify: service(),

  _subscribe(subscriptionPackage) {
    let order = {
      duration: subscriptionPackage.get('duration'),
      project: this.get('model.project')
    }
    this.store
      .createRecord('timed-subscription-order', order)
      .save()
      .then(() => {
        this.notify.success(this.i18n.t('sysupport.reload.success'))
        this.transitionToRoute(
          'sysupport-subscriptions.detail.index',
          this.get('model.project')
        )
      })
      .catch(() => {
        this.notify.error(this.i18n.t('sysupport.reload.error'))
      })
  },

  actions: {
    subscribe(subscriptionPackage) {
      this._subscribe(subscriptionPackage)
    }
  }
})
