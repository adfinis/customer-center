import Ember from 'ember'
import ajax  from 'ic-ajax'

const { on, inject } = Ember

/**
 * Timescout component
 *
 * @class TimescoutComponent
 * @public
 */
export default Ember.Component.extend({

  /**
   * Timescout service
   *
   * @property {TimescoutService} timescout
   * @public
   */
  timescout: inject.service(),

  /**
   * Fetch the timescout data
   *
   * @return {void}
   */
  fetchData: on('init', async function() {
    this.set('model', await this.get('timescout').fetchProjects())
  })
})
