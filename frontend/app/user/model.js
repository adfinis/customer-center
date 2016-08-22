import Ember from 'ember'

const { computed } = Ember

/**
 * The User model
 *
 * @class User
 * @public
 */
export default Ember.Object.extend({

  ajax: Ember.inject.service(),

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
    let res = await this.get('ajax').request('/api/v1/user/current', {
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
      sysupport: this.sysupport,
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
  fullName: computed('firstName', 'lastName', function() {
    return `${this.firstName} ${this.lastName}`.trim()
  }),

  /**
   * Has redmine access
   *
   * @property {boolean} redmine
   * @readOnly
   * @public
   */
  redmine: computed('groups.[]', function() {
    return this.groups.find(g => g.endsWith('-redmine'))
  }),

  /**
   * Has monitoring access
   *
   * @property {boolean} monitoring
   * @readOnly
   * @public
   */
  monitoring: computed('groups.[]', function() {
    return this.groups.find(g => g.endsWith('-mon'))
  }),

  /**
   * Has sysupport access
   *
   * @property {boolean} sysupport
   * @readOnly
   * @public
   */
  sysupport: computed('sysupport', 'groups.[]', function() {
    return this.groups.find(g => g.endsWith('-sysupport')) && this.sysupport
  }),

  /**
   * List of wiki groups
   *
   * @property {string[]} wikis
   * @readOnly
   * @public
   */
  wikis: computed('groups.[]', function() {
    return this.groups.filter(g => g.endsWith('-wiki'))
                      .map(g => g.split('-')[0])
  }),

  /**
   * Has redmine access
   *
   * @property {boolean} rt
   * @readOnly
   * @public
   */
  rt: computed('email', 'emails.[]', function() {
    return this.email || this.emails.length
  })
})
