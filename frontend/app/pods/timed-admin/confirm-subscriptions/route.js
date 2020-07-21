import { computed } from '@ember/object'
import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'
import { captureException } from '@sentry/browser'

import RouteAccessMixin from 'customer-center/mixins/route-access-mixin'

export default Route.extend(RouteAccessMixin, {
  i18n: service(),
  notify: service(),

  groups: computed(() => ({
    requireAll: ['adsy-timed-admin']
  })),

  init() {
    this._super(...arguments)
    this.set('breadCrumb', {
      title: this.i18n.t('timed.admin.confirm-subscription')
    })
  },

  model() {
    return this.store.query('timed-subscription-order', {
      include: 'project,project.customer',
      acknowledged: 0,
      ordering: '-ordered'
    })
  },

  actions: {
    accept(order) {
      this._accept(order)
    },
    deny(order) {
      this._deny(order)
    }
  },

  _accept(order) {
    try {
      order.set('acknowledged', true)
      order.confirm()
      order.unloadRecord()
      this.notify.info(
        this.i18n.t('timed.admin.confirmSuccess', order.get('project.name'))
      )
    } catch (e) {
      this.notify.error(this.i18n.t('global.error'))
      captureException(e)
    }
  },

  _deny(order) {
    order.destroyRecord()
    this.notify.info(
      this.i18n.t('timed.admin.confirmDeny', order.get('project.name'))
    )
  }
})
