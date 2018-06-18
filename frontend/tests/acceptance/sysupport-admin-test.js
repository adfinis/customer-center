import { module, test } from 'qunit'
import { setupApplicationTest } from 'ember-qunit'
import {
  authenticateSession,
  invalidateSession
} from 'customer-center/tests/helpers/ember-simple-auth'
import startApp from '../helpers/start-app'
import destroyApp from '../helpers/destroy-app'

module('Acceptance | Sysupport Admin', function(hooks) {
  setupApplicationTest(hooks)

  hooks.beforeEach(async function() {
    this.application = startApp()
    let user = server.create('user', 'admin')
    await authenticateSession(this.application, { data: user.id })
  })

  hooks.afterEach(async function() {
    await invalidateSession(this.application)
    destroyApp(this.application)
  })

  test('subscription-admin index', async function(assert) {
    server.createList('timed-subscription-project', 5)
    await visit('/sysupport-admin')

    assert.dom('[data-test-project]').exists({ count: 5 })
  })

  test('subscription-admin detail', async function(assert) {
    let project = server.create('timed-subscription-project')
    await visit('/sysupport-admin')

    await click('[data-test-project="0"]')
    assert.equal(currentURL(), `/sysupport-admin/${project.id}`)
    assert.equal(
      find(`[data-test-customer-name=${project.id}]`)[0].innerText,
      project.customer.name
    )
    assert.equal(
      find(`[data-test-billing-type-name=${project.id}]`)[0].innerText,
      project.billingType.name
    )
    assert.dom('[data-test-project-order]').exists({ count: 10 })
  })

  test('subscription-admin confirm-subscriptions accept', async function(assert) {
    let project = server.create('timed-subscription-project')
    await visit('/sysupport-admin/confirm-subscriptions')

    assert.dom('[data-test-order]').exists({ count: 5 })
    await click('[data-test-accept="0"]')
    assert.dom('[data-test-order]').exists({ count: 4 })
    await visit(`/sysupport-admin/${project.id}`)
    assert.dom('[data-test-acknowledged]').exists({ count: 6 })
  })

  test('subscription-admin confirm-subscriptions deny', async function(assert) {
    let project = server.create('timed-subscription-project')
    await visit('/sysupport-admin/confirm-subscriptions')

    assert.dom('[data-test-order]').exists({ count: 5 })
    await click('[data-test-deny="0"]')
    assert.dom('[data-test-order]').exists({ count: 4 })
    await visit(`/sysupport-admin/${project.id}`)
    assert.dom('[data-test-unconfirmed]').exists({ count: 4 })
  })
})
