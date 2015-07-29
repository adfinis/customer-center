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
  timescout: inject.service(),

  /**
   * Get timescout history
   *
   * @return {Promise}
   */
  model() {
    return this.get('timescout').fetchHistory()
  }
})
