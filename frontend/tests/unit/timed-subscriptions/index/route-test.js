import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'

module('Unit | Route | timed/index', function(hooks) {
  setupTest(hooks)

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:timed-subscriptions/index')
    assert.ok(route)
  })
})
