import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'
import EmberObject from '@ember/object'

module('Unit | Controller | dashboard', function(hooks) {
  setupTest(hooks)

  // Replace this with your real tests.
  test('percentage is correctly calculated', function(assert) {
    let controller = this.owner.lookup('controller:dashboard')
    controller.set('model', {
      projects: [
        EmberObject.create({
          totalTime: 12,
          purchasedTime: 40
        }),
        EmberObject.create({
          totalTime: 43,
          purchasedTime: 40
        }),
        EmberObject.create({
          totalTime: -23,
          purchasedTime: 40
        })
      ]
    })
    assert.deepEqual(controller.projects, [
      EmberObject.create({
        totalTime: -23,
        purchasedTime: 40,
        percentage: 0
      }),
      EmberObject.create({
        totalTime: 12,
        purchasedTime: 40,
        percentage: 0.3
      })
    ])
  })
})
