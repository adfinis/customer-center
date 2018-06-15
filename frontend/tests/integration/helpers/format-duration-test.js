import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render, find } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'
import moment from 'moment'

module('Integration | Helper | format duration', function(hooks) {
  setupRenderingTest(hooks)

  test('formats a duration of 12 hours and 45 minutes as 12 Hours 45 Minutes', async function(assert) {
    this.set('duration', moment.duration({ hours: 12, minutes: 45 }))

    await render(hbs`{{format-duration duration}}`)

    assert.equal(find('*').textContent.trim(), '12 Hours 45 Minutes')

    this.set('duration', moment.duration({ hours: 2, minutes: 5 }))

    assert.equal(find('*').textContent.trim(), '2 Hours 5 Minutes')
  })
})
