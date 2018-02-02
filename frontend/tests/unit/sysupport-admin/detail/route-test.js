import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'

module('Unit | Route | sysupport-admin/detail', function(hooks) {
  setupTest(hooks)

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:sysupport-admin/detail')
    assert.ok(route)
  })
})
