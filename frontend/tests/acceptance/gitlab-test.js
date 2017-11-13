import { module, test } from 'qunit'
import { setupApplicationTest } from 'ember-qunit'
import {
  authenticateSession,
  invalidateSession
} from 'customer-center/tests/helpers/ember-simple-auth'
import startApp from '../helpers/start-app'
import destroyApp from '../helpers/destroy-app'
import { selectChoose, clearSelected } from 'ember-power-select/test-support'
import { clickTrigger } from 'ember-basic-dropdown/test-support/helpers'
import { calendarSelect } from 'ember-power-calendar/test-support'
import moment from 'moment'

module('Acceptance | GitLab', function(hooks) {
  setupApplicationTest(hooks)

  hooks.beforeEach(function() {
    this.application = null
  })

  hooks.beforeEach(async function() {
    this.application = startApp()
    let user = server.create('user', 'customer')
    await authenticateSession(this.application, { data: user.id })
  })

  hooks.afterEach(async function() {
    await invalidateSession(this.application)
    destroyApp(this.application)
  })

  test('[T08] All projects and namespaces are rendered', async function(assert) {
    await visit('/projects')

    assert.equal(find('[data-test-group]').length, 3)
    assert.equal(find('[data-test-project]').length, 12)

    assert.dom('[data-test-group-name="1"]').hasText('test1')
    assert.dom('[data-test-group-name="2"]').hasText('test2')
    assert.dom('[data-test-group-name="3"]').hasText('test3')

    assert
      .dom('[data-test-group="0"] [data-test-project-name="0"]')
      .hasText('project0')
    assert
      .dom('[data-test-group="0"] [data-test-project-name="1"]')
      .hasText('project1')

    assert
      .dom('[data-test-group="1"] [data-test-project-name="0"]')
      .hasText('project0')
    assert
      .dom('[data-test-group="1"] [data-test-project-name="1"]')
      .hasText('project1')
    assert
      .dom('[data-test-group="1"] [data-test-project-name="2"]')
      .hasText('project2')
    assert
      .dom('[data-test-group="1"] [data-test-project-name="3"]')
      .hasText('project3')

    assert
      .dom('[data-test-group="2"] [data-test-project-name="0"]')
      .hasText('project0')
    assert
      .dom('[data-test-group="2"] [data-test-project-name="1"]')
      .hasText('project1')
    assert
      .dom('[data-test-group="2"] [data-test-project-name="2"]')
      .hasText('project2')
    assert
      .dom('[data-test-group="2"] [data-test-project-name="3"]')
      .hasText('project3')
    assert
      .dom('[data-test-group="2"] [data-test-project-name="4"]')
      .hasText('project4')
    assert
      .dom('[data-test-group="2"] [data-test-project-name="5"]')
      .hasText('project5')
  })

  test('[T09] Unauthorized user', async function(assert) {
    await invalidateSession(this.application)
    await visit('/projects')
    assert.equal(currentURL(), `/login`)
  })

  test('[T11] Search', async function(assert) {
    await visit('/projects')
    await fillIn('[data-test-search]', '0')
    assert.equal(find('[data-test-project]').length, 3)
  })

  test('[T14] Display pipelines', async function(assert) {
    await visit('/projects')
    assert
      .dom(
        '[data-test-group="0"] [data-test-project="0"] [data-test-pipeline-name="0"]'
      )
      .hasText('master')
    assert
      .dom(
        '[data-test-group="0"] [data-test-project="0"] [data-test-pipeline-name="1"]'
      )
      .hasText('prod')
    assert
      .dom(
        '[data-test-group="0"] [data-test-project="0"] [data-test-pipeline-name="2"]'
      )
      .hasText('test')

    assert
      .dom(
        '[data-test-group="0"] [data-test-project="0"] [data-test-pipeline-name="0"] [data-test-passed]'
      )
      .exists()

    assert
      .dom(
        '[data-test-group="0"] [data-test-project="0"] [data-test-pipeline-name="1"] [data-test-failed]'
      )
      .exists()

    assert
      .dom(
        '[data-test-group="0"] [data-test-project="0"] [data-test-pipeline-name="2"] [data-test-running]'
      )
      .exists()

    assert
      .dom(
        '[data-test-group="0"] [data-test-project="0"] [data-test-pipeline="0"] [data-test-stage-name="0"]'
      )
      .hasText('test')
    assert
      .dom(
        '[data-test-group="0"] [data-test-project="0"] [data-test-pipeline="0"] [data-test-stage-passed]'
      )
      .exists()

    assert
      .dom(
        '[data-test-group="0"] [data-test-project="0"] [data-test-pipeline="1"] [data-test-stage-name="0"]'
      )
      .hasText('test')
    assert
      .dom(
        '[data-test-group="0"] [data-test-project="0"] [data-test-pipeline="1"] [data-test-stage-failed]'
      )
      .exists()
    assert
      .dom(
        '[data-test-group="0"] [data-test-project="0"] [data-test-pipeline="1"] [data-test-stage-name="1"]'
      )
      .hasText('deploy')
    assert
      .dom(
        '[data-test-group="0"] [data-test-project="0"] [data-test-pipeline="1"] [data-test-stage-passed]'
      )
      .exists()

    assert
      .dom(
        '[data-test-group="0"] [data-test-project="0"] [data-test-pipeline="2"] [data-test-stage-name="0"]'
      )
      .hasText('test')
    assert
      .dom(
        '[data-test-group="0"] [data-test-project="0"] [data-test-pipeline="2"] [data-test-stage-running]'
      )
      .exists()
    assert
      .dom(
        '[data-test-group="0"] [data-test-project="0"] [data-test-pipeline="2"] [data-test-stage-name="1"]'
      )
      .hasText('test')
    assert
      .dom(
        '[data-test-group="0"] [data-test-project="0"] [data-test-pipeline="2"] [data-test-stage-running]'
      )
      .exists()
    assert
      .dom(
        '[data-test-group="0"] [data-test-project="0"] [data-test-pipeline="2"] [data-test-stage-name="2"]'
      )
      .hasText('test')
    assert
      .dom(
        '[data-test-group="0"] [data-test-project="0"] [data-test-pipeline="2"] [data-test-stage-running]'
      )
      .exists()
  })

  test('[T15] Projects are displayed correct', async function(assert) {
    await visit('/projects')
    assert.equal(find('[data-test-project-name]').length, 12)
    assert.equal(find('[data-test-pipelines]').length, 12)
    assert.equal(find('[data-test-commits]').length, 12)
  })

  test('[T16] Filter', async function(assert) {
    await visit('/projects')
    await selectChoose('[data-test-select] > *', 'test2')
    assert.equal(find('[data-test-project]').length, 4)
    await clearSelected('[data-test-select]')
    assert.equal(find('[data-test-project]').length, 12)
  })

  test('[T17] Change time span for commits', async function(assert) {
    await visit('/projects')
    await clickTrigger('[data-test-calendar] > *')
    await calendarSelect(
      '.ember-power-datepicker-content',
      moment().subtract(5, 'days')
    )
    assert
      .dom('[data-test-group="0"] [data-test-project="0"] [data-test-commits]')
      .hasText('6 Changes')
  })
})
