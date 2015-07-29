import Ember from 'ember'

const { inject } = Ember

export default Ember.Route.extend({

  /**
   * Redmine service to fetch redmine issues
   *
   * @property {RedmineService} redmine
   * @public
   */
  redmine: inject.service(),

  /**
   * Setup the controller
   *
   * @param {Ember.Controller} controller IndexController
   * @param {Object} model Object containing all the dashboard data
   * @return {void}
   */
  setupController(controller, model) {
    controller.set('model', model)
    controller.set('user',  this.modelFor('protected'))
  },

  /**
   * Index route model, containing all the dashboard data
   *
   * @return {Promise}
   */
  async model() {
    let user = await this.get('session.user')
    let data = {}

    if (user.get('redmine')) {
      data.redmine = this.get('redmine').fetchIssues({ limit: 5 })
    }

    return Ember.RSVP.hash(data)
  }
})
