import Route from '@ember/routing/route'

/**
 * Timescout timesheet loading route
 *
 * @class TimescoutTimesheetLoadingRoute
 * @public
 */
export default Route.extend({
  /**
   * Setup the controller
   *
   * @param {Ember.Controller} controller The controller
   * @return {void}
   * @public
   */
  setupController(controller) {
    controller.set('project', this.modelFor('timescout.timesheet'))
  }
})
