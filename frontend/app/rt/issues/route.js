import { inject as service } from '@ember/service'
import Route from '@ember/routing/route'

/**
 * RT route
 *
 * @class RTRoute
 * @public
 */
export default Route.extend({
  /**
   * RT service to fetch RT issues
   *
   * @property {RTService} rt
   * @public
   */
  rt: service(),

  /**
   * RTRoute query params
   *
   * @property {Object} queryParams
   * @public
   */
  queryParams: {
    /**
     * RT query params list limit
     *
     * @property {Object} queryParams.limit
     * @public
     */
    limit: { refreshModel: false },

    /**
     * Current RT list page
     *
     * @property {Object} queryParams.page
     * @public
     */
    page: { refreshModel: false }
  },

  /**
   * Returns the RT issues
   *
   * @param {Object} params Query params to fetch RT issues
   * @return {User}
   */
  model(params) {
    return this.get('rt').fetchIssues(params)
  }
})
