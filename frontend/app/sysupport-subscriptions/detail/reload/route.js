import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'
import RSVP from 'rsvp'

export default Route.extend({
  i18n: service(),

  init() {
    this._super(...arguments)
    this.set('breadCrumb', {
      title: this.get('i18n').t('sysupport.breadcrumbs.reload')
    })
  },

  model() {
    return RSVP.hash({
      project: this.modelFor('sysupport-subscriptions.detail'),
      packages: this.store.findAll('timed-subscription-package')
    })
  }
})
