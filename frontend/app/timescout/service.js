import Ember from 'ember'
import ajax  from 'ic-ajax'

/**
 * Timescout service for fetching projects, subscriptions and timesheets
 *
 * @class TimescoutService
 * @public
 */
export default Ember.Service.extend({

  /**
   * Timescout API requests
   *
   * @param {string} action The timescout API action
   * @param {Object} params Request query params
   * @return {Promise}
   * @private
   */
  request(action, params) {
    let data = Object.assign({}, params, { action })

    return ajax('/api/proxy/timescout/service/api.php', { data })
  },

  /**
   * Fetch timescout timesheets
   *
   * @param {number} projectID Project ID of timesheets to fetch
   * @param {number} page Page of timesheets to fetch
   * @param {number} limit Amount of timesheets to fetch
   * @return {Object}
   * @public
   */
  async fetchTimesheets(projectID, page, limit) {
    let res = await this.request('timesheet', { projectID, page, limit })
    res.meta = { projectID: Number(projectID) }
    return res
  },

  /**
   * Fetch timescout projects
   *
   * @return {Promise}
   * @public
   */
  fetchProjects() {
    return this.request('projects')
  },

  /**
   * Fetch the timescout subscription history
   *
   * @return {Promise}
   * @public
   */
  fetchHistory() {
    return this.request('history')
  }
})
