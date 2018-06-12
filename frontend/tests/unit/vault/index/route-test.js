import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'

module('Unit | Route | vault/index', function(hooks) {
  setupTest(hooks)

  test('(mobile) hide detail', function(assert) {
    let route = this.owner.lookup('route:vault/index')
    route.set('controller', { detail: false })
    route.send('willTransition', { targetName: 'vault.index.index' })
    assert.notOk(route.get('controller.detail'))
  })

  test('(mobile) show detail', function(assert) {
    let route = this.owner.lookup('route:vault/index')
    route.set('controller', { detail: false })
    route.send('willTransition', { targetName: 'vault.index.edit' })
    assert.ok(route.get('controller.detail'))
  })
})
