import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'

export default Route.extend({
  i18n: service(),

  init() {
    this._super(...arguments)
    this.set('breadCrumb', {
      title: this.i18n.t('timed.breadcrumbs.overview')
    })
  },

  model() {
    return this.store.query('timed-subscription-project', { ordering: 'name' })
  }
})
