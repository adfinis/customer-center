import Model from 'ember-data/model'
import attr from 'ember-data/attr'
import { computed } from '@ember/object'
import ENV from 'customer-center/config/environment'

export default Model.extend({
  email: attr('string'),
  shortname: attr('string'),
  username: attr('string'),
  firstName: attr('string'),
  lastName: attr('string'),
  language: attr('string'),
  groups: attr(),
  emails: attr(),

  fullName: computed('firstName', 'lastName', function() {
    return `${this.firstName} ${this.lastName}`.trim()
  }),

  redmine: computed('groups.[]', function() {
    return this._checkGroup('redmine')
  }),

  monitoring: computed('groups.[]', function() {
    return this._checkGroup('mon')
  }),

  vault: computed('groups.[]', function() {
    return this._checkGroupOrEmployee('vault')
  }),

  timed: computed('groups.[]', function() {
    return this._checkGroupOrEmployee('timed')
  }),

  gitlab: computed('groups.[]', function() {
    return this._checkGroup('gitlab')
  }),

  rt: computed('groups.[]', function() {
    return this._checkGroupOrEmployee('rt')
  }),

  /**
   * Get all groups with a `-gitlab` suffix.
   *
   * @returns {Object[]} Returns all gitlab groups.
   * @author Jonas Cosandey (jonas.cosandey@adfinis-sygroup.ch)
   */
  gitlabGroups: computed('groups.[]', function() {
    // get all groups with the suffix and then remove it
    return this.groups
      .filter(g => g.endsWith('gitlab'))
      .map(group => group.replace('-gitlab', ''))
  }),

  wikis: computed('groups.[]', function() {
    return this.groups
      .filter(g => g.endsWith('-wiki'))
      .map(g => g.split('-')[0])
  }),

  admin: computed('groups.[]', function() {
    return this._checkGroup(ENV.APP.adminGroup)
  }),

  adsyUser: computed('groups.[]', function() {
    return this._checkGroup(ENV.APP.adsyUserGroup)
  }),

  _checkGroup(name) {
    return this.groups.find(g => g.endsWith(name))
  },

  _checkGroupOrEmployee(name) {
    return this._checkGroup(name) || this.admin || this.adsyUser
  }
})
