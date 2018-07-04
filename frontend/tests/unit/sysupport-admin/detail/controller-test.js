import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'

module('Unit | Controller | sysupport-admin/detail', function(hooks) {
  setupTest(hooks)

  // Replace this with your real tests.
  test('duration', function(assert) {
    let controller = this.owner.lookup('controller:sysupport-admin/detail')

    this.setProperties({ hour: 1, minute: 1 })
  })
})
