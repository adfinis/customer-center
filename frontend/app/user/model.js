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
      firstName: this.firstName,
      lastName:  this.lastName,
      email:     this.email,
      language:  this.language,
      groups:    this.groups,
      emails:    this.emails
    }
  },

  /**
   * Full name
   *
   * @property {string} fullName
   * @readOnly
   * @public
   */
  fullName: computed(function() {
    return `${this.firstName} ${this.lastName}`.trim()
  }),

  /**
   * Has redmine access
   *
   * @property {boolean} redmine
   * @readOnly
   * @public
   */
  redmine: computed(function() {
    return this.groups.find(g => g.endsWith('-redmine'))
  }),

  /**
   * Has monitoring access
   *
   * @property {boolean} monitoring
   * @readOnly
   * @public
   */
  monitoring: computed(function() {
    return this.groups.find(g => g.endsWith('-mon'))
  }),

  /**
   * Has timed access
   *
   * @property {boolean} timed
   * @readOnly
   * @public
   */
  timed: computed(function() {
    return this.groups.find(g => g.endsWith('-timed')) || 1
  }),

  /**
   * List of wiki groups
   *
   * @property {string[]} wikis
   * @readOnly
   * @public
   */
  wikis: computed(function() {
    return this.groups.filter(g => g.endsWith('-wiki'))
                      .map(g => g.split('-')[0])
  })
})
