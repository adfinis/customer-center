import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'

module('controller:login/password-reset', function(hooks) {
  setupTest(hooks)

  // Replace this with your real tests.
  test('it exists', function(assert) {
    const controller = this.owner.lookup('controller:login/password-reset')
    assert.ok(controller)
  })
})
