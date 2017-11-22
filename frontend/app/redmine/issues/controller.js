import Controller from '@ember/controller'

export default Controller.extend({
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
