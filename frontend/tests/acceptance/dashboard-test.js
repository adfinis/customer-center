import { click, currentURL, visit } from '@ember/test-helpers'
import { module, test } from 'qunit'
import { setupApplicationTest } from 'ember-qunit'
import {
  authenticateSession,
  invalidateSession
} from 'ember-simple-auth/test-support'
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage'

module('Acceptance | dashboard', function(hooks) {
  setupApplicationTest(hooks)
  setupMirage(hooks)

  hooks.beforeEach(async function() {
    let user = this.server.create('user', 'customer')
    await authenticateSession({ data: user.id })
  })

  hooks.afterEach(async function() {
    await invalidateSession()
  })

  test('timed', async function(assert) {
    let [p1, p2] = this.server.createList('timed-subscription-project', 2)

    await visit('/')

    assert.equal(currentURL(), '/')

    assert.dom('[data-test-project]').exists({ count: 2 })

    assert
      .dom(`[data-test-project="${p1.id}"] [data-test-project-name]`)
      .hasText(p1.name)
    assert.dom(`[data-test-project="${p1.id}"] [data-test-percentage]`).exists()
    assert
      .dom(`[data-test-project="${p1.id}"] [data-test-project-total]`)
      .exists()

    assert
      .dom(`[data-test-project="${p2.id}"] [data-test-project-name]`)
      .hasText(p2.name)
    assert.dom(`[data-test-project="${p2.id}"] [data-test-percentage]`).exists()
    assert
      .dom(`[data-test-project="${p2.id}"] [data-test-project-total]`)
      .exists()

    await click(`[data-test-project="${p1.id}"] [data-test-project-name]`)
    assert.equal(currentURL(), '/timed-subscriptions/' + p1.id)

    await visit('/')
    assert.equal(currentURL(), '/')

    await click(`[data-test-project="${p2.id}"] [data-test-project-name]`)
    assert.equal(currentURL(), '/timed-subscriptions/' + p2.id)

    await visit('/')
    assert.equal(currentURL(), '/')

    await click('[data-test-all-projects]')
    assert.equal(currentURL(), '/timed-subscriptions')

    await visit('/')
    assert.equal(currentURL(), '/')
  })
})
