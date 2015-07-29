import Ember from 'ember'

const { computed } = Ember

/**
 * The User model
 *
 * @class User
 * @public
 */
export default Ember.Object.extend({

  /**
   * Has redmine access
   *
   * @property {boolean} redmine
   * @public
   */
  redmine: computed(function() {
    return this.groups.find(g => g.endsWith('-redmine'))
  }),

  /**
   * Has monitoring access
   *
   * @property {boolean} monitoring
   * @public
   */
  monitoring: computed(function() {
    return this.groups.find(g => g.endsWith('-mon'))
  }),

  /**
   * Has timed access
   *
   * @property {boolean} timed
   * @public
   */
  timed: computed(function() {
    return this.groups.find(g => g.endsWith('-timed')) || 1
  }),

  /**
   * List of wiki groups
   *
   * @property {string[]} wikis
   * @public
   */
  wikis: computed(function() {
    return this.groups.filter(g => g.endsWith('-wiki'))
                      .map(g => g.split('-')[0])
  })
})
