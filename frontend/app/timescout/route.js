import { inject as service } from '@ember/service'
import Route from '@ember/routing/route'

export default Route.extend({
  /**
   * Timescout service
   *
   * @property {TimescoutService} timescout
   * @public
   */
  timescout: service(),

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
