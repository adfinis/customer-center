import DS from 'ember-data'
import attr from 'ember-data/attr'

export default DS.Model.extend({
  acknowledged: attr('boolean'),
  duration: attr('string'),
  ordered: attr('string'),
  project: DS.belongsTo('project')
})
