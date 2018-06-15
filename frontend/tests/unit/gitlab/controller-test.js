import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'

module('Unit | Controller | gitlab', function(hooks) {
  setupTest(hooks)

  test('[T12] Filter by group', function(assert) {
    let controller = this.owner.lookup('controller:gitlab')
    controller.set('selection', { id: 1 })
    controller.set('model', [{ id: 1 }, { id: 2 }, { id: 3 }])
    assert.equal(controller.get('groups')[0].id, 1)
    assert.equal(controller.get('groups').length, 1)

    controller.set('selection', '')
    assert.equal(controller.get('groups')[0].id, 1)
    assert.equal(controller.get('groups')[1].id, 2)
    assert.equal(controller.get('groups')[2].id, 3)
    assert.equal(controller.get('groups').length, 3)
  })
})
