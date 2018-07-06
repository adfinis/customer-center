import { fillIn, click, currentURL, visit } from '@ember/test-helpers'

import setupMirage from 'ember-cli-mirage/test-support/setup-mirage'
import { setupApplicationTest } from 'ember-qunit'
import {
  authenticateSession,
  invalidateSession
} from 'ember-simple-auth/test-support'
import moment from 'moment'
import { module, test } from 'qunit'

import DjangoDurationTransform from 'customer-center/transforms/django-duration'

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
    assert.dom('[data-test-project-report]').exists({ count: 5 })
  })

  test('subscription-admin reload', async function(assert) {
    let project = this.server.create('timed-subscription-project', {
      spentTime: DjangoDurationTransform.create().serialize(
        moment.duration({ hours: 10 })
      ),
      purchasedTime: DjangoDurationTransform.create().serialize(
        moment.duration({ hours: 15 })
      )
    })

    await visit('/sysupport-admin')

    await click('[data-test-project="0"]')
    assert.equal(currentURL(), `/sysupport-admin/${project.id}`)

    assert.dom('[data-test-project-total-time]').hasText('5 Hours')

    await click('[data-test-reload-accordion]')
    await fillIn('[data-test-hour-input]', 10)
    await fillIn('[data-test-minute-input]', 30)

    assert.dom('[data-test-project-total-time]').hasText('15 Hours 30 Minutes')

    assert.dom('[data-test-project-order]').exists({ count: 10 })

    await click('[data-test-reload-submit]')

    assert.dom('[data-test-project-order]').exists({ count: 11 })

    assert
      .dom('[data-test-project-order]:last-child > [data-test-order-duration]')
      .hasText('10 Hours 30 Minutes')

    await click('[data-test-reload-accordion]')
    assert.dom('[data-test-reload-submit]').isDisabled()
    await fillIn('[data-test-minute-input]', 30)
    assert.dom('[data-test-reload-submit]').isNotDisabled()
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
