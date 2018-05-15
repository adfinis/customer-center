import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'

import { run } from '@ember/runloop'

module('Unit | Model | timed user', function(hooks) {
  setupTest(hooks)

  test('compute full name', function(assert) {
    let timedUser = run(() =>
      this.owner
        .lookup('service:store')
        .createRecord('timed-user', { firstName: 'Padme', lastName: 'Amidala' })
    )
    assert.equal(timedUser.get('fullName'), 'Padme Amidala')
  })
})
