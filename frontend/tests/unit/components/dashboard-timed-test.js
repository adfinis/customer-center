import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'
import EmberObject from '@ember/object'
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage'

module('Unit | Component | dashboard-timed', function(hooks) {
  setupTest(hooks)
  setupMirage(hooks)

  test('percentage is correctly calculated', function(assert) {
    let component = this.owner.lookup('component:dashboard-timed')
    component.init = () => {
      this._super(...arguments)
    }
    assert.equal(
      component._getPercentage(
        EmberObject.create({
          totalTime: 10,
          purchasedTime: 40
        })
      ),
      0.25
    )
    assert.equal(
      component._getPercentage(
        EmberObject.create({
          totalTime: -12,
          purchasedTime: 40
        })
      ),
      0
    )
  })
})
