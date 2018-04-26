import Controller from '@ember/controller'
import { inject as service } from '@ember/service'

export default Controller.extend({
  i18n: service(),
  notify: service(),

  actions: {
    subscribe(subscriptionPackage) {
      this._subscribe(subscriptionPackage)
    }
  },

  _subscribe(subscriptionPackage) {
    let order = {
      duration: subscriptionPackage.get('duration'),
      project: this.get('model.project')
    }
    this.store
      .createRecord('timed-subscription-order', order)
      .save()
      .then(() => {
        this.transitionToRoute(
          'sysupport.detail.index',
          this.get('model.project')
        )
        this.get('notify').success(
          this.get('i18n').t('sysupport.reload.success')
        )
      })
      .catch(() => {
        this.get('notify').error(this.get('i18n').t('sysupport.reload.error'))
      })
  }
})
