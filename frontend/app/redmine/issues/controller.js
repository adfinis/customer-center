import Ember from 'ember'

export default Ember.Controller.extend({
  /**
   * Query params
   *
   * @property {string[]} queryParams
   * @public
   */
  queryParams: ['limit', 'page'],

  /**
   * Redmine list limit
   *
   * @property {Object} limit
   * @public
   */
  limit: 20,

  /**
   * Redmine list page
   *
   * @property {Object} page
   * @public
   */
  page: 1
})
