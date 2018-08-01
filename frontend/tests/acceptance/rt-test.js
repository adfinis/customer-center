import { fillIn, currentURL, visit } from '@ember/test-helpers'
import { module, test } from 'qunit'
import { setupApplicationTest } from 'ember-qunit'
import {
  authenticateSession,
  invalidateSession
} from 'ember-simple-auth/test-support'
import moment from 'moment'
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage'

module('Acceptance | rt', function(hooks) {
  setupApplicationTest(hooks)
  setupMirage(hooks)

  hooks.beforeEach(async function() {
    let user = this.server.create('user', 'customer')
    await authenticateSession({ data: user.id })
  })

  hooks.afterEach(async function() {
    await invalidateSession()
  })

  test('Filter status', async function(assert) {
    await visit('/rt')

    assert.equal(currentURL(), '/rt')


  })
})
