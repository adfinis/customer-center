import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'

import { run } from '@ember/runloop'

module('Unit | Serializer | timed customer', function(hooks) {
  setupTest(hooks)

  // Replace this with your real tests.
  test('it serializes records', function(assert) {
    let record = run(() =>
      this.owner.lookup('service:store').createRecord('timed-customer')
    )

    let serializedRecord = record.serialize()

    assert.ok(serializedRecord)
  })
})
