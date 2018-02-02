import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'
import EmberObject from '@ember/object'
import moment from 'moment'

module('Unit | Controller | sysupport-admin/index', function(hooks) {
  setupTest(hooks)

  test('controller', function(assert) {
    let controller = this.owner.lookup('controller:sysupport-admin/index')
    let models = [
      EmberObject.extend({
        id: 1,
        duration: moment.duration(1, 'hour')
      }).create(),
      EmberObject.extend({
        id: 3,
        duration: moment.duration(3, 'hour')
      }).create(),
      EmberObject.extend({
        id: 2,
        duration: moment.duration(2, 'hour')
      }).create()
    ]
    controller.set('model', models)

    let asc = controller._sortDurations(models, {
      order: 'asc',
      attr: 'duration'
    })
    assert.equal(asc[0].get('id'), 1)
    assert.equal(asc[1].get('id'), 2)
    assert.equal(asc[2].get('id'), 3)

    let desc = controller._sortDurations(models, {
      order: 'desc',
      attr: 'duration'
    })
    assert.equal(desc[0].get('id'), 3)
    assert.equal(desc[1].get('id'), 2)
    assert.equal(desc[2].get('id'), 1)
  })
})
