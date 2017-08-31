import DS from 'ember-data'
import attr from 'ember-data/attr'

export default DS.Model.extend({
  comment: attr('string'),
  date: attr('string'),
  duration: attr('string')
})
