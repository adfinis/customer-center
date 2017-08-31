import Ember from 'ember'

/**
 * Timescout timesheet route
 *
 * @class TimescoutTimesheetRoute
 * @public
 */
export default Ember.Route.extend({
  /**
   * Timescout timesheet (project) model
   *
   * @return {Object}
   */
  model({ id }) {
    let projectID = Number(id)
    return this.store.query('report', {
      project: projectID,
      include: 'user'
    })
  }
})
