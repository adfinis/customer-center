import DS from 'ember-data'
import attr from 'ember-data/attr'

export default DS.Model.extend({
  price: attr('string'),
  duration: attr('string')
})
