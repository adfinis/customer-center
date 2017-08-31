import DS from 'ember-data'
import attr from 'ember-data/attr'

export default DS.Model.extend({
  purchasedTime: attr('string'),
  spentTime: attr('string'),
  project: DS.belongsTo('project'),
  subscription: DS.belongsTo('subscription')
})
