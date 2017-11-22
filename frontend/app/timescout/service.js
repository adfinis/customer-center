import Service, { inject as service } from '@ember/service'
import moment from 'moment'

/**
 * Timescout service for fetching projects, subscriptions and timesheets
 *
 * @class TimescoutService
 * @public
 */
export default Service.extend({
  ajax: service(),

  /**
   * Timescout API requests
   *
   * @param {string} action The timescout API action
   * @param {Object} params Request query params
   * @param {string} type   Request type
   * @return {Promise}
   * @private
   */
  request(action, params, type = 'get') {
    let data = Object.assign({}, params, { action })

    return this.get('ajax').request('/api/proxy/timescout/service/api.php', {
      type,
      data
    })
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
    res.timesheetEntries = res.timesheetEntries.map(e => {
      e.date = moment(e.date, 'DD.MM.YYYY')
      return e
    })
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
  },

  fetchAbos(abotypeID) {
    return this.request('aboreload', { abotypeID })
  },

  sendTimeLoad(projectID, aboID) {
    return this.request('load', { projectID, aboID }, 'post')
  }
})
