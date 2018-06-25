import { fillIn, currentURL, visit } from '@ember/test-helpers'
import { module, test } from 'qunit'
import { setupApplicationTest } from 'ember-qunit'
import {
  authenticateSession,
  invalidateSession
} from 'ember-simple-auth/test-support'
import { clickTrigger } from 'ember-basic-dropdown/test-support/helpers'
import { calendarSelect } from 'ember-power-calendar/test-support'
import moment from 'moment'
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage'

module('Acceptance | GitLab', function(hooks) {
  setupApplicationTest(hooks)
  setupMirage(hooks)

  hooks.beforeEach(async function() {
    let user = this.server.create('user', 'customer')
    await authenticateSession({ data: user.id })
  })

  hooks.afterEach(async function() {
    await invalidateSession()
  })

  test('All projects and namespaces are rendered', async function(assert) {
    assert.expect(17)
    await visit('/projects')

    assert.dom('[data-test-group]').exists({ count: 3 })
    assert.dom('[data-test-project]').exists({ count: 12 })

    assert.dom('[data-test-group-name="1"]').hasText('test1')
    assert.dom('[data-test-group-name="2"]').hasText('test2')
    assert.dom('[data-test-group-name="3"]').hasText('test3')

    for (let i = 2, group = 0; i <= 6; i += 2) {
      for (let project = 0; project < i; project++) {
        assert
          .dom(
            `[data-test-group="${group}"] [data-test-project-name="${project}"]`
          )
          .hasText(`project${project}`)
      }
      group++
    }
  })

  test('Unauthorized user', async function(assert) {
    await invalidateSession(this.application)
    await visit('/projects')
    assert.equal(currentURL(), `/login`)
  })

  test('Search', async function(assert) {
    await visit('/projects')
    await fillIn('[data-test-search]', '0')
    assert.dom('[data-test-project]').exists({ count: 3 })
  })

  test('Display pipelines', async function(assert) {
    await visit('/projects')

    let project = '[data-test-group="0"] [data-test-project="0"]'

    assert.dom(`${project} [data-test-pipeline-name="0"]`).hasText('master')
    assert.dom(`${project} [data-test-pipeline-name="1"]`).hasText('prod')
    assert.dom(`${project} [data-test-pipeline-name="2"]`).hasText('test')

    assert
      .dom(`${project} [data-test-pipeline-name="0"] [data-test-passed]`)
      .exists()

    assert
      .dom(`${project} [data-test-pipeline-name="1"] [data-test-failed]`)
      .exists()

    assert
      .dom(`${project} [data-test-pipeline-name="2"] [data-test-running]`)
      .exists()

    let pipeline1 = `${project} [data-test-pipeline="0"]`
    assert.dom(`${pipeline1} [data-test-stage-name="0"]`).hasText('test')
    assert.dom(`${pipeline1} [data-test-stage-passed]`).exists()

    let pipeline2 = `${project} [data-test-pipeline="1"]`
    assert.dom(`${pipeline2} [data-test-stage-name="0"]`).hasText('test')
    assert.dom(`${pipeline2} [data-test-stage-failed]`).exists()
    assert.dom(`${pipeline2} [data-test-stage-name="1"]`).hasText('deploy')
    assert.dom(`${pipeline2} [data-test-stage-passed]`).exists()

    let pipeline3 = `${project} [data-test-pipeline="2"]`
    assert.dom(`${pipeline3} [data-test-stage-name="0"]`).hasText('test')
    assert.dom(`${pipeline3} [data-test-stage-running]`).exists()
    assert.dom(`${pipeline3} [data-test-stage-name="1"]`).hasText('test')
    assert.dom(`${pipeline3} [data-test-stage-running]`).exists()
    assert.dom(`${pipeline3} [data-test-stage-name="2"]`).hasText('test')
    assert.dom(`${pipeline3} [data-test-stage-running]`).exists()
  })

  test('Projects are displayed correct', async function(assert) {
    await visit('/projects')
    assert.dom('[data-test-project-name]').exists({ count: 12 })
    assert.dom('[data-test-pipelines]').exists({ count: 12 })
    assert.dom('[data-test-commits]').exists({ count: 12 })
  })

  test('Filter', async function(assert) {
    await visit('/projects')
    await fillIn('[data-test-select] > *', 2)
    assert.dom('[data-test-project]').exists({ count: 4 })
    await fillIn('[data-test-select] > *', '')
    assert.dom('[data-test-project]').exists({ count: 12 })
  })

  test('Change time span for commits', async function(assert) {
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
