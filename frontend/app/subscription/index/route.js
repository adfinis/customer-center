import Ember from 'ember'

const { inject } = Ember

/**
 * Timescout index route
 *
 * @class TimescoutIndexRoute
 * @public
 */
export default Ember.Route.extend({
  /**
   * Timescout service
   *
   * @property {TimescoutService} timescout
   * @public
   */
  subscription: inject.service(),

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
    controller.set('projects', this.modelFor('subscription'))
  },

  /**
   * Get timescout history
   *
   * @return {Promise}
   * @public
   */
  async model() {
    const projects = await this.modelFor('subscription')
    const projectIds = await projects.map(entry => {
      console.log(entry)
      return entry.get('project.id')
    })
    console.log(projectIds)
    const orders = await this.store.query('subscription-order', {
      filter: { project: projectIds }
    })
    return orders
  }
})
