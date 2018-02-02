import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'

module('Unit | Route | sysupport-admin/confirm-subscriptions', function(hooks) {
  setupTest(hooks)

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:sysupport-admin/confirm-subscriptions')
    assert.ok(route)
  })
})
