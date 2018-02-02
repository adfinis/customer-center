import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'
import moment from 'moment'

import { run } from '@ember/runloop'

module('Unit | Model | timed subscription project', function(hooks) {
  setupTest(hooks)

  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store')
    let model = run(() =>
      store.createRecord('timed-subscription-project', {
        name: 'X',
        purchasedTime: moment.duration(5, 'hours'),
        spentTime: moment.duration(3, 'hours'),
        orders: [
          store.createRecord('timed-subscription-order', {
            acknowledged: true,
            duration: moment.duration(5, 'hours')
          }),
          store.createRecord('timed-subscription-order', {
            acknowledged: false,
            duration: moment.duration(5, 'hours')
          }),
          store.createRecord('timed-subscription-order', {
            acknowledged: false,
            duration: moment.duration(5, 'hours')
          })
        ]
      })
    )
    assert.equal(model.get('totalTime').as('hours'), 2)
    assert.equal(model.get('unconfirmedTime').as('hours'), 10)
  })
})
