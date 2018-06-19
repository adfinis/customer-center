import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'

module('Unit | Controller | vault/index', function(hooks) {
  setupTest(hooks)

  test('set detail when in detail route', function(assert) {
    let controller = this.owner.lookup('controller:vault')
    controller.set('router', {
      currentRouteName: 'vault.edit'
    })

    assert.ok(controller.get('detail'))
  })

  test('do not set detail when in detail route', function(assert) {
    let controller = this.owner.lookup('controller:vault')
    controller.set('router', {
      currentRouteName: 'vault.index'
    })

    assert.notOk(controller.get('detail'))
  })
})
