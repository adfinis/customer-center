import { click, currentURL, visit } from '@ember/test-helpers'
import { module, test } from 'qunit'
import { setupApplicationTest } from 'ember-qunit'
import {
  authenticateSession,
  invalidateSession
} from 'ember-simple-auth/test-support'
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage'

module('Acceptance | Sysupport Subscriptions', function(hooks) {
  setupApplicationTest(hooks)
  setupMirage(hooks)

  hooks.beforeEach(async function() {
    let user = this.server.create('user', 'customer')
    await authenticateSession({ data: user.id })
  })

  hooks.afterEach(async function() {
    await invalidateSession()
  })

  test('subscription-project detail', async function(assert) {
    server.create('timed-subscription-project')
    await visit('/sysupport-subscriptions')

    await click('[data-test-detail-link="0"]')
    assert.equal(currentURL(), '/sysupport-subscriptions/1')
    assert.dom('[data-test-project-report]').exists({ count: 5 })
    assert.dom('[data-test-project-order]').exists({ count: 10 })
  })

  test('subscription-project reload', async function(assert) {
    this.server.create('timed-subscription-project')
    this.server.create('timed-subscription-package')
    await visit('/sysupport-subscriptions')

    await click('[data-test-reload-link="0"]')
    assert.equal(currentURL(), '/sysupport-subscriptions/1/reload')
    await click('[data-test-project-reload="0"]')
    assert.equal(currentURL(), '/sysupport-subscriptions/1')
    assert.dom('[data-test-project-order]').exists({ count: 11 })
  })

  test('subscription-project reload empty', async function(assert) {
    this.server.create('timed-subscription-project')
    await visit('/sysupport-subscriptions')

    await click('[data-test-reload-link="0"]')
    assert.equal(currentURL(), '/sysupport-subscriptions/1/reload')
    assert
      .dom('[class="uk-first-column"]')
      .includesText('support@adfinis-sygroup.ch')
  })
})
