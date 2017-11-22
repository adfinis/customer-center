import Route from '@ember/routing/route'

/**
 * Timescout timesheet route
 *
 * @class TimescoutTimesheetRoute
 * @public
 */
export default Route.extend({
  /**
   * Timescout timesheet (project) model
   *
   * @return {Object}
   */
  model({ id }) {
    let projectID = Number(id)
    return this.modelFor('timescout').find(p => p.id === projectID)
  }
})
