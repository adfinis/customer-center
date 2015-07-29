import Ember from 'ember'

const { computed, observer, inject } = Ember

/**
 * Redmine list component
 *
 * @class RedmineList
 * @public
 */
export default Ember.Component.extend({

  /**
   * Redmine service to fetch redmine issues
   *
   * @property {RedmineService} redmine
   * @public
   */
  redmine: inject.service(),

  /**
   * Limit redmine issues
   *
   * @property {number} limit
   * @public
   */
  limit: 10,

  /**
   * Redmine issue offset
   *
   * @property {number} offset
   * @public
   */
  offset: 0,

  /**
   * Redmine issue total
   *
   * @property {number} total
   * @public
   */
  total: 0,

  /**
   * Redmine issue sort field/order
   *
   * @property {number} sort
   * @public
   */
  sort: 'updated_on:desc',

  /**
   * Redmine host name
   *
   * @property {string} host
   * @readOnly
   * @private
   */
  host: computed.oneWay('redmine.host'),

  /**
   * The current page displayed
   *
   * @property {number} page
   * @public
   */
  page: computed('limit', 'offset', {
    get() {
      return Math.max(1, this.get('offset') / this.get('limit'))
    },
    set(key, value) {
      this.set('offset', this.get('limit') * (value - 1))

      return value
    }
  }),

  /**
   * The total pages of issues available
   *
   * @property {number} totalPages
   * @readOnly
   * @public
   */
  totalPages: computed('limit', 'total', function() {
    return Math.ceil(this.get('total') / this.get('limit'))
  }),

  /**
   * Should there be a pager?
   *
   * @property {boolean} showPager
   * @readOnly
   * @private
   */
  showPager: computed('totalPages', function() {
    return this.get('totalPages') > 1
  }),

  /**
   * Update the model of this component, refetches new redmine issues
   *
   * @return {void}
   * @private
   */
  updateModel: observer('limit', 'offset', 'sort', function() {
    this.send('updateModel')
  }),

  /**
   * RedmineComponent actions
   *
   * @property {Object} actions
   */
  actions: {

    /**
     * Update model action, fetches new issues from redmine
     *
     * @return {void}
     */
    async updateModel() {
      this.set('error', null)

      try {
        let redmine = this.get('redmine')
        let params  = {
          limit:  this.get('limit'),
          offset: this.get('offset'),
          sort:   this.get('sort')
        }

        let { issues, total } = await redmine.fetchIssues(params)
        this.set('issues', issues)
        this.set('total',  total)
      }
      catch (e) {
        this.set('error', e)
      }
    }
  }
})
