import { click, fillIn, currentURL, visit } from '@ember/test-helpers'
import { module, test } from 'qunit'
import { setupApplicationTest } from 'ember-qunit'
import {
  authenticateSession,
  invalidateSession
} from 'ember-simple-auth/test-support'
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

  test('Filter and search', async function(assert) {
    this.server.createList('rt-ticket', 5, {
      status: 'open',
      subject: 'averyspecificteststring'
    })
    this.server.createList('rt-ticket', 5, { status: 'open' })
    this.server.createList('rt-ticket', 5, {
      status: 'resolved',
      subject: 'averyspecificteststring'
    })
    this.server.createList('rt-ticket', 5, { status: 'resolved' })

    assert.expect(8)

    await visit('/tickets?page=1&page_size=100')

    await fillIn('[data-test-search]', 'averyspecificteststring')
    await click('[data-test-search-submit]')
    assert.dom('[data-test-ticket]').exists({ count: 10 })
    assert.dom('[data-test-ticket-subject]').hasText('averyspecificteststring')

    await fillIn('[data-test-select-status] > select', 'resolved')
    assert.dom('[data-test-ticket]').exists({ count: 5 })
    assert.dom('[data-test-ticket-status]').hasText('Resolved')

    await fillIn('[data-test-search]', '')
    await click('[data-test-search-submit]')
    assert.dom('[data-test-ticket]').exists({ count: 10 })
    assert.dom('[data-test-ticket-status]').hasText('Resolved')

    await fillIn('[data-test-select-status] > select', '')
    assert.dom('[data-test-ticket]').exists({ count: 20 })

    assert
      .dom('[data-test-ticket-link]')
      .hasAttribute(
        'href',
        new RegExp(
          /^https:\/\/rt\.adfinis-sygroup\.ch\/rt\/Ticket\/Display\.html\?id=\d*$/
        )
      )
  })

  test('Pagination', async function(assert) {
    this.server.createList('rt-ticket', 10, { status: 'new' })
    this.server.createList('rt-ticket', 10, { status: 'open' })
    this.server.createList('rt-ticket', 10, { status: 'resolved' })

    assert.expect(12)

    await visit('/tickets')

    assert.equal(currentURL(), '/tickets')
    assert.dom('[data-test-ticket]').exists({ count: 10 })
    assert.dom('[data-test-pagination]').hasText('Previous Page 1 of 3 Next')

    await fillIn('[data-test-select-pagesize] > select', 20)
    assert.equal(currentURL(), '/tickets?page=1&page_size=20')
    assert.dom('[data-test-ticket]').exists({ count: 20 })
    assert.dom('[data-test-pagination]').hasText('Previous Page 1 of 2 Next')

    await click('[data-test-pagination-next]')
    assert.equal(currentURL(), '/tickets?page=2&page_size=20')
    assert.dom('[data-test-ticket]').exists({ count: 10 })
    assert.dom('[data-test-pagination]').hasText('Previous Page 2 of 2 Next')

    await fillIn('[data-test-select-pagesize] > select', 50)
    assert.equal(currentURL(), '/tickets?page=1&page_size=50')
    assert.dom('[data-test-ticket]').exists({ count: 30 })
    assert.dom('[data-test-pagination]').hasText('Previous Page 1 of 1 Next')
  })
})
