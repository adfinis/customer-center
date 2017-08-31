import Ember from 'ember'

/**
 * Timescout timesheet loading route
 *
 * @class TimescoutTimesheetLoadingRoute
 * @public
 */
export default Ember.Route.extend({
  /**
   * Setup the controller
   *
   * @param {Ember.Controller} controller The controller
   * @return {void}
   * @public
   */
  setupController(controller) {
    controller.set('project', this.modelFor('subscription.timesheet'))
  }
})
