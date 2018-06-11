import { module, test } from 'qunit'
import { setupApplicationTest } from 'ember-qunit'
import {
  authenticateSession,
  invalidateSession
} from 'customer-center/tests/helpers/ember-simple-auth'
import startApp from '../helpers/start-app'
import destroyApp from '../helpers/destroy-app'

module('Acceptance | Sysupport Subscriptions', function(hooks) {
  setupApplicationTest(hooks)

  hooks.beforeEach(async function() {
    this.application = startApp()
    let user = server.create('user', 'customer')
    await authenticateSession(this.application, { data: user.id })
  })

  hooks.afterEach(async function() {
    await invalidateSession(this.application)
    destroyApp(this.application)
  })

  test('subscription-project detail', async function(assert) {
    server.create('timed-subscription-project')
    await visit('/sysupport-subscriptions')

    await click('[data-test-detail-link="0"]')
    assert.equal(currentURL(), '/sysupport-subscriptions/1')
    assert.equal(find('[data-test-project-report]').length, 5)
    assert.equal(find('[data-test-project-order]').length, 10)
  })

  test('subscription-project reload', async function(assert) {
    server.create('timed-subscription-project')
    server.create('timed-subscription-package')
    await visit('/sysupport-subscriptions')

    await click('[data-test-reload-link="0"]')
    assert.equal(currentURL(), '/sysupport-subscriptions/1/reload')
    await click('[data-test-project-reload="0"]')
    assert.equal(currentURL(), '/sysupport-subscriptions/1')
    assert.equal(find('[data-test-project-order]').length, 11)
  })
})
