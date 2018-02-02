import Model from 'ember-data/model'
import attr from 'ember-data/attr'
import { computed } from '@ember/object'

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

  rt: computed('email', 'emails.[]', function() {
    return this.get('email') || this.get('emails.length')
  }),

  wikis: computed('groups.[]', function() {
    return this.get('groups')
      .filter(g => g.endsWith('-wiki'))
      .map(g => g.split('-')[0])
  }),

  admin: computed('groups.[]', function() {
    return this._checkGroup(window.CustomerCenter.adminGroup)
  }),

  _checkGroup(name) {
    return this.get('groups').find(g => g.endsWith(name))
  }
})
