import Route from '@ember/routing/route'
import { computed } from '@ember/object'
import RouteAccessMixin from 'customer-center/mixins/route-access-mixin'

export default Route.extend(RouteAccessMixin, {
  groups: computed(() => ({
    requireAll: ['timed'],
    requireOne: ['adsy-user', 'adsy-admin']
  }))
})
