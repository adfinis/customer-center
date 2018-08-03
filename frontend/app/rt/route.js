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

  model(query) {
    query.include = 'creator,owner'
    query.page = query.page || 1
    query.page_size = query.page_size || 10
    query.search || delete query.search
    query.status || delete query.status

    return this.store.query('rt-ticket', query)
  },

  queryParams: {
    page: { refreshModel: true },
    page_size: { refreshModel: true },
    search: { refreshModel: true },
    status: { refreshModel: true }
  }
})
