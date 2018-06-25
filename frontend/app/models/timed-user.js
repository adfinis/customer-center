import attr from 'ember-data/attr'
import Model from 'ember-data/model'
import { computed } from '@ember/object'
import { hasMany } from 'ember-data/relationships'

export default Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),

  fullName: computed('firstName', 'lastName', function() {
    return `${this.firstName} ${this.lastName}`.trim()
  }),
  reports: hasMany('timed-reports')
})
