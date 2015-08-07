import Ember from 'ember'
import ajax  from 'ic-ajax'

const { computed } = Ember

/**
 * The User model
 *
 * @class User
 * @public
 */
export default Ember.Object.extend({

  /**
   * User rollback
   *
   * @return {void}
   */
  rollback() {
    this.setProperties(JSON.parse(this.__rollback).data.user)
  },

  /**
   * Save the user
   *
   * @return {Promise}
   */
  async save() {
    let res = await ajax('/api/v1/user/current', {
      type:        'put',
      data:        JSON.stringify(this),
      contentType: 'application/json'
    })

    this.setProperties(res.data.user)
    this.__rollback = JSON.stringify(res)
  },

  /**
   * Transform the user for the backend
   *
   * @return {Object}
   */
  toJSON() {
    return {
      username:  this.username,
      shortname: this.shortname,
      email:     this.email,
      language:  this.language,
      groups:    this.groups,
      emails:    this.emails
    }
  },

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
