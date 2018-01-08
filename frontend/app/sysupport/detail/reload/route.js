import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'
import { translationMacro as t } from 'ember-i18n'

export default Route.extend({
  notify: service(),
  i18n: service(),

  model() {
    return this.store.findAll('timed-subscription-package')
  },

  setupController(controller, model) {
    controller.setProperties({
      model,
      breadCrumb: {
        title: t('sysupport.breadcrumbs.reload')
      }
    })
  },

  actions: {
    subscribe(subscriptionPackage) {
      this._subscribe(subscriptionPackage)
    }
  },

  _subscribe(subscriptionPackage) {
    let order = {
      duration: subscriptionPackage.get('duration'),
      project: this.modelFor('sysupport/detail')
    }
    this.store
      .createRecord('timed-subscription-order', order)
      .save()
      .then(
        () => {
          this.get('notify').success(
            this.get('i18n').t('sysupport.reload.success')
          )
          this.transitionTo(
            'sysupport.detail.index',
            this.modelFor('sysupport/detail').id
          )
        },
        () => {
          this.get('notify').error(this.get('i18n').t('sysupport.reload.error'))
        }
      )
  }
})
