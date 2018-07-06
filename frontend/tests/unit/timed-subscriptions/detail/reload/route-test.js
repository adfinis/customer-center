import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'

module('Unit | Route | timed/detail/reload', function(hooks) {
  setupTest(hooks)

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:timed-subscriptions/detail/reload')
    assert.ok(route)
  })
})
