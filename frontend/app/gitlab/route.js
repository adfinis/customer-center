import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'
import { all } from 'rsvp'
import RouteAccessMixin from 'customer-center/mixins/route-access-mixin'
import { computed } from '@ember/object'

export default Route.extend(RouteAccessMixin, {
  //specify which groups have access to this route.
  groups: computed(() => ({
    requireAll: ['gitlab', 'adsy-customer']
  })),

  i18n: service(),
  session: service(),
  notify: service(),
  ajax: service(),

  /**
   * Set the breadcrumb for this route.
   *
   * @author Jonas Cosandey (jonas.cosandey@adfinis-sygroup.ch)
   */
  init() {
    this._super(...arguments)
    this.set('breadCrumb', {
      title: this.i18n.t('gitlab.projects')
    })
  },

  /**
   * Fetch all groups specified in `user.gitlabGroups`.
   *
   * @returns {Object[]} Returns groups for user
   * @author Jonas Cosandey (jonas.cosandey@adfinis-sygroup.ch)
   */
  async model() {
    let user = await this.get('session.user')
    return (await all(
      user.get('gitlabGroups').map(async group => {
        try {
          return await this.ajax.request(`/api/proxy/gitlab/groups/${group}/`)
        } catch (error) {
          this.notify.warning(`${this.i18n.t('gitlab.errors.group')} ${group}`)
          return null
        }
      })
      // filter the groups an remove elements that are falsey.
    )).filter(group => group)
  }
})
