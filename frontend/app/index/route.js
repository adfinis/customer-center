import Ember from 'ember'

const { inject } = Ember

/**
 * AdSy Customer Center index route
 *
 * @class IndexRoute
 * @public
 */
export default Ember.Route.extend({

  /**
   * Redmine service to fetch redmine issues
   *
   * @property {RedmineService} redmine
   * @public
   */
  redmine: inject.service(),

  /**
   * RT service to fetch rt issues
   *
   * @property {RTService} redmine
   * @public
   */
  rt: inject.service(),

  /**
   * Symon service
   *
   * @property {SymonService} symon
   * @public
   */
  symon: inject.service(),

  /**
   * Timescout service
   *
   * @property {TimescoutService} timescout
   * @public
   */
  timescout: inject.service(),

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

    if (user.get('emails.length')) {
      data.rt = this.get('rt').fetchIssues({ limit: 5 })
    }

    if (user.get('symonitoring')) {
      data.symon = this.get('symon').fetchHosts()
    }

    data.subscriptions = this.get('timescout').fetchProjects()

    return Ember.RSVP.hash(data)
  }
})
