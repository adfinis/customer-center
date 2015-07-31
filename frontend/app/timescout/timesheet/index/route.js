import Ember from 'ember'

const { inject } = Ember

/**
 * Timescout timesheet index route
 *
 * @class TimescoutTimesheetIndexRoute
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
    controller.set('loading', false)
  },

  /**
   * Fetch timesheets from timescout
   *
   * @return {Object}
   */
  model({ limit, page }) {
    let projectID = this.modelFor('timescout.timesheet').id
    return this.get('timescout').fetchTimesheets(projectID, page, limit)
  },

  /**
   * Actions of TimescoutTimesheetIndexRoute
   *
   * @property {Object} actions
   * @public
   */
  actions: {

    /**
     * Set loading state
     *
     * @param {Ember.Transition} transition The current route transition
     * @param {Ember.Route} route The current route
     * @return {boolean}
     */
    loading(transition, route) {
      // Set loading state on timesheet table if available, otherwise
      // load default loading template "timescout.timesheet.loading"
      if (route.controller && Ember.$('.timesheet-table').length) {
        route.controller.set('loading', true)

        return false
      }

      return true
    }
  }
})
