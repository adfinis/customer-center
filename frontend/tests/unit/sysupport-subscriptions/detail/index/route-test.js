import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'

module('Unit | Route | sysupport/detail/index', function(hooks) {
  setupTest(hooks)

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:sysupport-subscriptions/detail/index')
    assert.ok(route)
  })
})
