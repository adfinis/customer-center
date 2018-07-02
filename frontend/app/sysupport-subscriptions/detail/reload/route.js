import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'
import RSVP from 'rsvp'

export default Route.extend({
  i18n: service(),

  init() {
    this._super(...arguments)
    this.set('breadCrumb', {
      title: this.i18n.t('sysupport.breadcrumbs.reload')
    })
  },

  async model() {
    let project = await this.modelFor('sysupport-subscriptions.detail')
    return RSVP.hash({
      project,
      packages: this.store.findAll('timed-subscription-package', {
        billing_type: project.get('billingType.id')
      })
    })
  }
})
