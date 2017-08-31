import DS from 'ember-data'
import attr from 'ember-data/attr'

export default DS.Model.extend({
  archived: attr('string'),
  comment: attr('string'),
  name: attr('string')
})
