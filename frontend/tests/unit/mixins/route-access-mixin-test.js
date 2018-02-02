import EmberObject from '@ember/object'
import RouteAccessMixinMixin from 'customer-center/mixins/route-access-mixin'
import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'
import { computed } from '@ember/object'

module('Unit | Mixin | route access mixin', function(hooks) {
  setupTest(hooks)

  test('access mixin positive', function(assert) {
    let session = this.owner.lookup('service:store')
    session.set(
      'user',
      new Promise(resolve => {
        resolve(
          EmberObject.extend({ groups: computed(() => ['adsy-user']) }).create()
        )
      })
    )

    let ok = true
    let mixin = EmberObject.extend(RouteAccessMixinMixin).create({
      session,
      groups: ['adsy-user'],
      transitionTo: () => {
        ok = !ok
      }
    })
    mixin.beforeModel({ abort: () => {} })
    assert.ok(ok)
  })

  test('access mixin negative', function(assert) {
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
      transitionTo: path => {
        assert.ok(path)
      }
    })
    mixin.beforeModel({ abort: () => {} })
  })
})
