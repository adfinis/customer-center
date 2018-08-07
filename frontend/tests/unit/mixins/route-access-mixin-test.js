import EmberObject from '@ember/object'
import RouteAccessMixinMixin from 'customer-center/mixins/route-access-mixin'
import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'

module('Unit | Mixin | route access mixin', function(hooks) {
  setupTest(hooks)

  test('access mixin positive', async function(assert) {
    assert.expect(1)
    let mixin = EmberObject.extend(RouteAccessMixinMixin).create({
      groups: {
        requireAll: ['timed'],
        requireOne: ['adsy-customer', 'adsy-user']
      }
    })
    assert.ok(
      mixin._hasPermissions(
        EmberObject.create({ groups: ['timed', 'adsy-user'] })
      )
    )
  })

  test('access mixin negative', async function(assert) {
    assert.expect(1)
    let mixin = EmberObject.extend(RouteAccessMixinMixin).create({
      groups: {
        requireAll: ['timed', 'adsy-timed-admin'],
        requireOne: ['adsy-customer', 'adsy-user']
      }
    })
    assert.notOk(
      mixin._hasPermissions(
        EmberObject.create({ groups: ['timed', 'adsy-customer'] })
      )
    )
  })
})
