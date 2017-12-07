import DS from 'ember-data'

export default DS.Model.extend({
  duaration: DS.attr('django-duration'),
  acknowledged: DS.attr('boolean', { defaultValue: false }),
  ordered: DS.attr('djnago-date'),
  project: DS.belongsTo('subscription-project')
})
