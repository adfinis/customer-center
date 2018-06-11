import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'

import { run } from '@ember/runloop'

module('Unit | Model | timed billing types', function(hooks) {
  setupTest(hooks)

  test('it exists', function(assert) {
    let model = run(() =>
      this.owner.lookup('service:store').createRecord('timed-billing-type')
    )
    // let store = this.store();
    assert.ok(!!model)
  })
})
