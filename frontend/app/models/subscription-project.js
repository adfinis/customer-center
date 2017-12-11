import attr from 'ember-data/attr'
import Model from 'ember-data/model'
import { hasMany } from 'ember-data/relationships'

export default Model.extend({
  name: attr('string'),
  purchasedTime: attr('django-duration'),
  spentTime: attr('django-duration'),
  billingType: attr('number'),
  orders: hasMany('subscription-order')
})
