import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'

module('Unit | Route | vault/index/edit', function(hooks) {
  setupTest(hooks)

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:vault/index/edit')
    assert.ok(route)
  })
})
