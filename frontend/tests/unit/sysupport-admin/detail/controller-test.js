import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'

import moment from 'moment'

module('Unit | Controller | sysupport-admin/detail', function(hooks) {
  setupTest(hooks)

  test('duration', function(assert) {
    assert.expect(10)

    let controller = this.owner.lookup('controller:sysupport-admin/detail')

    controller.setProperties({ hour: 1, minute: 1 })
    assert.equal(controller.duration.hours(), 1)
    assert.equal(controller.duration.minutes(), 1)

    controller.setProperties({ hour: null, minute: 1 })
    assert.equal(controller.duration.minutes(), 1)

    controller.setProperties({ hour: 1, minute: null })
    assert.equal(controller.duration.hours(), 1)

    controller.setProperties({ minute: 'hi', hour: 1 })
    assert.equal(controller.duration.hours(), 1)
    assert.equal(controller.duration.minutes(), 0)

    controller.setProperties({ minute: 3, hour: 'sd' })
    assert.equal(controller.duration.hours(), 0)
    assert.equal(controller.duration.minutes(), 3)

    controller.setProperties({ hour: 'sdlfjj', minute: null })
    assert.notOk(controller.duration)

    controller.setProperties({ minute: 'sdlfjj', hour: null })
    assert.notOk(controller.duration)
  })

  test('error', function(assert) {
    assert.expect(7)

    let controller = this.owner.lookup('controller:sysupport-admin/detail')

    controller.setProperties({ hour: 1, minute: 1 })
    assert.notOk(controller.error)

    controller.setProperties({ hour: null, minute: 1 })
    assert.notOk(controller.error)

    controller.setProperties({ hour: 1, minute: null })
    assert.notOk(controller.error)

    controller.setProperties({ minute: 'hi', hour: 1 })
    assert.ok(controller.error)

    controller.setProperties({ minute: 3, hour: 'sd' })
    assert.ok(controller.error)

    controller.setProperties({ hour: 'sdlfjj', minute: null })
    assert.ok(controller.error)

    controller.setProperties({ minute: 'sdlfjj', hour: null })
    assert.ok(controller.error)
  })

  test('orders and project model', function(assert) {
    let controller = this.owner.lookup('controller:sysupport-admin/detail')

    controller.set('fetchModels', {
      orders: {
        lastSuccessful: { value: 'test1' }
      },
      project: {
        lastSuccessful: { value: 'test1' }
      }
    })
    controller.set('model', { orders: 'test2' })
    controller.set('model', { project: 'test2' })
    assert.equal(controller.orders, 'test1')
    assert.equal(controller.project, 'test1')

    controller.set('fetchModels', null)
    assert.equal(controller.orders, 'test2')
    assert.equal(controller.project, 'test2')
  })

  test('previewDuration', function(assert) {
    let controller = this.owner.lookup('controller:sysupport-admin/detail')
    controller.set('preview', true)
    controller.setProperties({ hour: 1, minute: 30 })
    controller.set('model', {
      projet: {
        purchasedTime: moment.duration({ hours: 10 }),
        spentTime: moment.duration({ hours: 8, minutes: 30 })
      }
    })

    assert.notOk(controller.previewDuration.hours())
    assert.notOk(controller.previewDuration.minutes())
  })

  test('validation', function(assert) {
    let controller = this.owner.lookup('controller:sysupport-admin/detail')

    controller.set('preview', false)
    controller.setProperties({ hour: 1, minute: 'sdf' })
    assert.deepEqual(controller.validation, { hour: true, minute: false })
    assert.ok(controller.preview)

    controller.set('preview', false)
    controller.setProperties({ hour: 'sdf', minute: 'sdf' })
    assert.deepEqual(controller.validation, { hour: false, minute: false })
    assert.notOk(controller.preview)
  })
})
