import { inject as service } from '@ember/service'
import Route from '@ember/routing/route'

/**
 * Timescout index route
 *
 * @class TimescoutIndexRoute
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
   * Setup timescout index controller
   *
   * @param {TimescoutIndexController} controller The timescout index controller
   * @param {Object[]} model The history of subscriptions
   * @return {void}
   * @public
   */
  setupController(controller, model) {
    controller.set('model', model)
    controller.set('projects', this.modelFor('timescout'))
  },

  /**
   * Get timescout history
   *
   * @return {Promise}
   * @public
   */
  model() {
    return this.get('timescout').fetchHistory()
  }
})
