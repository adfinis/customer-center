import DS from 'ember-data'

export default DS.Model.extend({
  name: DS.attr('string'),
  purchasedTime: DS.attr('django-duration'),
  spentTime: DS.attr('django-duration'),
  billingType: DS.attr('number')
})
