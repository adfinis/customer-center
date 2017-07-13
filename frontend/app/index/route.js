import Ember from 'ember'

/**
 * AdSy Customer Center index route
 *
 * @class IndexRoute
 * @public
 */
export default Ember.Route.extend({
  /**
   * Setup the controller
   *
   * @param {Ember.Controller} controller IndexController
   * @param {Object} model Object containing all the dashboard data
   * @return {void}
   */
  setupController(controller, model) {
    controller.set('model', model)
    controller.set('user', this.modelFor('protected'))
  }
})
