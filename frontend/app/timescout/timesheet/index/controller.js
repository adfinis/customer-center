import Ember from 'ember'

const { computed } = Ember

/**
 * Timescout timesheet controller
 *
 * @class TimescoutTimesheetController
 * @public
 */
export default Ember.Controller.extend({

  /**
   * Query params of this controller
   *
   * @property {string[]} queryParams
   * @public
   */
  queryParams: [ 'page', 'limit' ],

  /**
   * Current page
   *
   * @property {number} page
   * @public
   */
  page: 1,

  /**
   * Timesheet limit
   *
   * @property {number} limit
   * @public
   */
  limit: 10,

  /**
   * Show pager?
   *
   * @property {boolean} showPages
   * @readOnly
   * @private
   */
  showPager: computed('totalPages', function() {
    return this.get('totalPages') > 1
  }),

  /**
   * Total pages
   *
   * @property {number} totalPages
   * @readOnly
   * @private
   */
  totalPages: computed('model.total', 'limit', function() {
    return Math.ceil(this.get('model.total') / this.get('limit'))
  })
})
