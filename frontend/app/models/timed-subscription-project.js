import attr from 'ember-data/attr'
import Model from 'ember-data/model'
import { hasMany, belongsTo } from 'ember-data/relationships'
import { computed } from '@ember/object'
import moment from 'moment'
import ENV from 'customer-center/config/environment'

export default Model.extend({
  name: attr('string'),
  purchasedTime: attr('django-duration'),
  spentTime: attr('django-duration'),

  orders: hasMany('timed-subscription-order'),
  billingType: belongsTo('timed-billing-type'),
  customer: belongsTo('timed-customer'),

  totalTime: computed('purchasedTime', 'spentTime', function() {
    return moment.duration(this.purchasedTime - this.spentTime)
  }),

  unconfirmedTime: computed('orders', function() {
    return this.orders
      .filter(order => order !== null)
      .filter(order => !order.get('acknowledged'))
      .reduce((accumulator, order) => {
        return accumulator.add(order.get('duration'))
      }, moment.duration())
  }),

  isTimeAlmostConsumed: computed('totalTime', function() {
    return this.totalTime.asHours() <= ENV.APP.alertTime
  })
})
