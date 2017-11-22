import { inject as service } from '@ember/service'
import Route from '@ember/routing/route'

/**
 * Timescout timesheet index route
 *
 * @class TimescoutTimesheetIndexRoute
 * @public
 */
export default Route.extend({
  /**
   * Timescout service
   *
   * @property {TimescoutService} timescout
   * @public
   */
  timescout: service(),

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
    controller.set('project', this.modelFor('timescout.timesheet'))
    controller.set('model', model)
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
      if (
        route.controller &&
        document.querySelectorAll('.timesheet-table').length
      ) {
        route.controller.set('loading', true)

        return false
      }

      return true
    }
  }
})
