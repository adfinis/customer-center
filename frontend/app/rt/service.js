import Ember from 'ember'
import ajax  from 'ic-ajax'

/**
 * RT Service for fetching data from a rt instance
 *
 * @class RTService
 * @public
 */
export default Ember.Service.extend({

  /**
   * Fetch rt issues from a host
   *
   * @param {Object} params Query params to filter issues
   * @return {Object}
   */
  async fetchIssues(params) {
    let res = await ajax('/api/rt/tickets', { data: params })

    return {
      issues: res.data.tickets,
      total:  res.data.total,
      offset: res.data.offset,
      limit:  res.data.limit
    }
  }
})
