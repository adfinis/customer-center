import Ember from 'ember'

const { inject } = Ember

export default Ember.Route.extend({

  /**
   * Timescout service
   *
   * @property {TimescoutService} timescout
   * @public
   */
  timescout: inject.service(),

  /**
   * Gets timescout projects
   *
   * @return {Promise}
   * @public
   */
  model() {
    return this.get('timescout').fetchProjects()
  }
})
