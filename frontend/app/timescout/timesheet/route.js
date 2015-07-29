import Ember from 'ember'

const { inject } = Ember

/**
 * Timescout timesheet route
 *
 * @class TimescoutTimesheetRoute
 * @public
 */
export default Ember.Route.extend({

  /**
   * Timescout service
   *
   * @property {TimescoutService} timescout
   * @public
   */
  timescout: inject.service(),

  /**
   * Query params of this route
   *
   * @property {Object} queryParams
   * @public
   */
  queryParams: {
    page: {
      refreshModel: true
    },
    limit: {
      refreshModel: true
    }
  },

  /**
   * Setup the TimescoutTimesheetController
   *
   * @param {TimescoutTimesheetController} controller Controller to setup
   * @param {Object} model Data model for the controller
   * @return {void}
   */
  setupController(controller, model) {
    let project = this.modelFor('timescout').find(p =>
      p.id === model.meta.projectID
    )

    controller.set('project', project)
    controller.set('model',   model)
  },

  /**
   * Fetch timesheets from timescout
   *
   * @return {Object}
   */
  model({ id: projectID, limit, page }) {
    return this.get('timescout').fetchTimesheets(projectID, page, limit)
  }
})
