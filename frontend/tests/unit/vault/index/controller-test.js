import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'

module('Unit | Controller | vault/index', function(hooks) {
  setupTest(hooks)

  test('show detail, hide tree on mobile', function(assert) {
    let controller = this.owner.lookup('controller:vault/index')
    controller.setProperties({
      media: {
        isDesktop: false,
        isTablet: false,
        isMobile: true
      },
      detail: true
    })

    assert.notOk(controller.get('showTree'))
  })

  test('hide detail, show tree on mobile', function(assert) {
    let controller = this.owner.lookup('controller:vault/index')
    controller.setProperties({
      media: {
        isDesktop: false,
        isTablet: true,
        isMobile: false
      },
      detail: false
    })

    assert.ok(controller.get('showTree'))
  })

  test('show detail, show tree on desktop', function(assert) {
    let controller = this.owner.lookup('controller:vault/index')
    controller.setProperties({
      media: {
        isDesktop: true,
        isTablet: false,
        isMobile: false
      },
      detail: true
    })

    assert.ok(controller.get('showTree'))
  })
})
