import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'

export default Route.extend({
  i18n: service(),

  init() {
    this._super(...arguments)
    this.set('breadCrumb', {
      title: this.get('i18n').t('sysupport.admin.admin')
    })
  },

  model() {
    return this.store.findAll('timed-subscription-project', {
      include: 'billing_type,customer,orders',
      ordering: 'name'
    })
  }
})
