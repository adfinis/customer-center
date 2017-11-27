import { inject as service } from '@ember/service'
import Route from '@ember/routing/route'

/**
 * Redmine route
 *
 * @class RedmineRoute
 * @public
 */
export default Route.extend({
  /**
   * Redmine service to fetch redmine issues
   *
   * @property {RedmineService} redmine
   * @public
   */
  redmine: service(),

  /**
   * RedmineRoute query params
   *
   * @property {Object} queryParams
   * @public
   */
  queryParams: {
    /**
     * Redmine query params list limit
     *
     * @property {Object} queryParams.limit
     * @public
     */
    limit: { refreshModel: false },

    /**
     * Current redmine list page
     *
     * @property {Object} queryParams.page
     * @public
     */
    page: { refreshModel: false }
  },

  /**
   * Returns the redmine issues
   *
   * @param {Object} params Query params to fetch redmine issues
   * @return {User}
   */
  model(params) {
    return this.get('redmine').fetchIssues(params)
  }
})
