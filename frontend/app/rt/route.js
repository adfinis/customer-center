import Route from '@ember/routing/route'
import { computed } from '@ember/object'
import RouteAccessMixin from 'customer-center/mixins/route-access-mixin'
import { inject as service } from '@ember/service'

export default Route.extend(RouteAccessMixin, {
  groups: computed(() => ({
    requireAll: ['rt'],
    requireOne: ['adsy-customer']
  })),

  i18n: service(),

  init() {
    this._super(...arguments)
    this.set('breadCrumb', {
      title: this.i18n.t('rt.breadcrumbs.tickets')
    })
  },

  model({ page = 1, page_size = 10, search = null, status = null }) {
    return this.store.query('rt-ticket', {
      include: 'creator,owner',
      page,
      page_size,
      search,
      status
    })
  },

  queryParams: {
    page: { refreshModel: true },
    page_size: { refreshModel: true },
    search: { refreshModel: true },
    status: { refreshModel: true }
  }
})
