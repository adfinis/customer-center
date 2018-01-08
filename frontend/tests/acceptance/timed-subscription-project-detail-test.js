import { test } from 'qunit'
import moduleForAcceptance from 'adsycc/tests/helpers/module-for-acceptance'
import {
  authenticateSession,
  invalidateSession
} from 'adsycc/tests/helpers/ember-simple-auth'
import startApp from '../helpers/start-app'
import destroyApp from '../helpers/destroy-app'

moduleForAcceptance('Acceptance | Sysupport', {
  application: null,
  beforeEach() {
    this.application = startApp()
    let user = server.create('user')
    authenticateSession(this.application, { data: user.id })
  },
  afterEach() {
    invalidateSession(this.application)
    destroyApp(this.application)
  }
})

test('subscription-project detail', function(assert) {
  server.createList('timed-subscription-project', 1)
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
