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
    return `${this.get('firstName')} ${this.get('lastName')}`.trim()
  }),

  redmine: computed('groups.[]', function() {
    return this._checkGroup('redmine')
  }),

  monitoring: computed('groups.[]', function() {
    return this._checkGroup('mon')
  }),

  vault: computed('groups.[]', function() {
    return this._checkGroup('vault')
  }),

  sysupport: computed('groups.[]', function() {
    return this._checkGroup('sysupport')
  }),

  gitlab: computed('groups.[]', function() {
    return this._checkGroup('gitlab')
  }),

  /**
   * Get all groups with a `-gitlab` suffix.
   *
   * @returns {Object[]} Returns all gitlab groups.
   * @author Jonas Cosandey (jonas.cosandey@adfinis-sygroup.ch)
   */
  gitlabGroups: computed('groups.[]', function() {
    // get all groups with the suffix and then remove it
    return this.get('groups')
      .filter(g => g.endsWith('gitlab'))
      .map(group => group.replace('-gitlab', ''))
  }),

  rt: computed('email', 'emails.[]', function() {
    return this.get('email') || this.get('emails.length')
  }),

  wikis: computed('groups.[]', function() {
    return this.get('groups')
      .filter(g => g.endsWith('-wiki'))
      .map(g => g.split('-')[0])
  }),

  admin: computed('groups.[]', function() {
    return this._checkGroup(ENV.APP.adminGroup)
  }),

  _checkGroup(name) {
    return this.get('groups').find(g => g.endsWith(name))
  }
})
