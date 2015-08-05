import Ember from 'ember'

/**
 * RT issues controller
 *
 * @class RTIssuesController
 * @public
 */
export default Ember.Controller.extend({

  /**
   * Query params
   *
   * @property {string[]} queryParams
   * @public
   */
  queryParams: [ 'limit', 'page' ],

  /**
   * RT list limit
   *
   * @property {Object} limit
   * @public
   */
  limit: 20,

  /**
   * RT list page
   *
   * @property {Object} page
   * @public
   */
  page: 1
})
