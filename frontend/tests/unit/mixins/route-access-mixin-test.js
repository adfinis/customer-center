import EmberObject from '@ember/object'
import RouteAccessMixinMixin from 'customer-center/mixins/route-access-mixin'
import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'
import { computed } from '@ember/object'

module('Unit | Mixin | route access mixin', function(hooks) {
  setupTest(hooks)

  test('access mixin positive', async function(assert) {
    assert.expect(0)

    let session = this.owner.lookup('service:store')
    session.set(
      'user',
      new Promise(resolve => {
        resolve(
          EmberObject.extend({ groups: computed(() => ['adsy-user']) }).create()
        )
      })
    )

    let mixin = EmberObject.extend(RouteAccessMixinMixin).create({
      session,
      groups: ['adsy-user']
    })

    await mixin.beforeModel({
      abort: () => {
        assert.notOk(true)
      }
    })
  })

  test('access mixin negative', async function(assert) {
    let session = this.owner.lookup('service:store')
    session.set(
      'user',
      new Promise(resolve => {
        resolve(
          EmberObject.extend({
            groups: computed(() => ['adsy-customer'])
          }).create()
        )
      })
    )

    let mixin = EmberObject.extend(RouteAccessMixinMixin).create({
      session,
      groups: ['adsy-user'],
      transitionTo: () => {
        assert.step('transitionHome')
      }
    })

    await mixin.beforeModel({
      abort: () => {
        assert.step('abortTransition')
      }
    })

    assert.verifySteps(['abortTransition', 'transitionHome'])
  })
})
