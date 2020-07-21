import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'

module('Unit | Route | timed-admin/index', function(hooks) {
  setupTest(hooks)

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:timed-admin/index')
    assert.ok(route)
  })
})
