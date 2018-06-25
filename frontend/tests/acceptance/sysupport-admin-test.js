import { click, currentURL, visit } from '@ember/test-helpers'
import { module, test } from 'qunit'
import { setupApplicationTest } from 'ember-qunit'
import {
  authenticateSession,
  invalidateSession
} from 'ember-simple-auth/test-support'
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage'

module('Acceptance | Sysupport Admin', function(hooks) {
  setupApplicationTest(hooks)
  setupMirage(hooks)

  hooks.beforeEach(async function() {
    let user = this.server.create('user', 'admin')
    await authenticateSession({ data: user.id })
  })

  hooks.afterEach(async function() {
    await invalidateSession()
  })

  test('subscription-admin index', async function(assert) {
    this.server.createList('timed-subscription-project', 5)
    await visit('/sysupport-admin')

    assert.dom('[data-test-project]').exists({ count: 5 })
  })

  test('subscription-admin detail', async function(assert) {
    let project = this.server.create('timed-subscription-project')
    await visit('/sysupport-admin')

    await click('[data-test-project="0"]')
    assert.equal(currentURL(), `/sysupport-admin/${project.id}`)
    assert
      .dom(`[data-test-customer-name="${project.id}"]`)
      .hasText(project.customer.name)
    assert
      .dom(`[data-test-billing-type-name="${project.id}"]`)
      .hasText(project.billingType.name)
    assert.dom('[data-test-project-order]').exists({ count: 10 })
  })

  test('subscription-admin confirm-subscriptions accept', async function(assert) {
    let project = this.server.create('timed-subscription-project')
    await visit('/sysupport-admin/confirm-subscriptions')

    assert.dom('[data-test-order]').exists({ count: 5 })
    await click('[data-test-accept="0"]')
    assert.dom('[data-test-order]').exists({ count: 4 })
    await visit(`/sysupport-admin/${project.id}`)
    assert.dom('[data-test-acknowledged]').exists({ count: 6 })
  })

  test('subscription-admin confirm-subscriptions deny', async function(assert) {
    let project = this.server.create('timed-subscription-project')
    await visit('/sysupport-admin/confirm-subscriptions')

    assert.dom('[data-test-order]').exists({ count: 5 })
    await click('[data-test-deny="0"]')
    assert.dom('[data-test-order]').exists({ count: 4 })
    await visit(`/sysupport-admin/${project.id}`)
    assert.dom('[data-test-unconfirmed]').exists({ count: 4 })
  })
})
