import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'

module('Unit | Controller | sysupport/detail/reload', function(hooks) {
  setupTest(hooks)

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:sysupport/detail/reload')
    assert.ok(controller)
  })
})
