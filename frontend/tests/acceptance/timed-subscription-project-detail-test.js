import { test } from 'qunit'
import moduleForAcceptance from 'adsycc/tests/helpers/module-for-acceptance'
import {
  authenticateSession,
  invalidateSession
} from 'adsycc/tests/helpers/ember-simple-auth'

//TODO refactor this test to https://github.com/emberjs/rfcs/blob/master/text/0232-simplify-qunit-testing-api.md
moduleForAcceptance('Acceptance | Sysupport', {
  application: null,
  beforeEach() {
    let user = server.create('user')
    authenticateSession(this.application, { data: user.id })
  },
  afterEach() {
    invalidateSession(this.application)
  }
})

test('subscription-project detail', function(assert) {
  server.create('timed-subscription-project')
  visit('/sysupport/projects')

  andThen(function() {
    click('[data-test-detail-link="0"]')
    andThen(() => {
      assert.equal(currentURL(), '/sysupport/projects/1')
      assert.equal(find('[data-test-project-report]').length, 5)
      assert.equal(find('[data-test-project-order]').length, 5)
    })
  })
})

test('subscription-project reload', function(assert) {
  server.create('timed-subscription-project')
  server.create('timed-subscription-package')
  visit('/sysupport/projects')

  andThen(function() {
    click('[data-test-reload-link="0"]')
    andThen(() => {
      assert.equal(currentURL(), '/sysupport/projects/1/reload')
      click('[data-test-project-reload="0"]')
      andThen(() => {
        assert.equal(currentURL(), '/sysupport/projects/1')
        assert.equal(find('[data-test-project-order]').length, 6)
      })
    })
  })
})
