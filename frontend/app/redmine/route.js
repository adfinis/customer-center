import Ember from 'ember'

const { inject } = Ember

/**
 * Redmine route
 *
 * @class RedmineRoute
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
   * Returns the user model
   *
   * @return {User}
   */
  model() {
    return this.get('redmine').fetchIssues({ limit: 20 })
  }
})
