import Ember from 'ember'

const { inject } = Ember

export default Ember.Route.extend({
  /**
   * Timescout service
   *
   * @property {TimescoutService} timescout
   * @public
   */
  subscription: inject.service(),

  /**
   * Gets timescout projects
   *
   * @return {Promise}
   * @public
   */
  async model() {
    const projects = await this.store.query('subscription-project', {
      customer: 218,
      include: 'project,subscription'
    })
    return projects
  }
})
