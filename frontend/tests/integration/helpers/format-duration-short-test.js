import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'
import moment from 'moment'

module('Integration | Helper | format duration short', function(hooks) {
  setupRenderingTest(hooks)

  test('formats a duration of 12 hours and 45 minutes as 12:45', async function(assert) {
    this.set('duration', moment.duration())
    await render(hbs`{{format-duration-short duration}}`)

    this.set('duration', moment.duration({ hours: 12, minutes: 45 }))
    assert.dom('*').hasText('12:45')

    this.set('duration', moment.duration({ hours: 2, minutes: 5 }))
    assert.dom('*').hasText('02:05')

    this.set('duration', moment.duration({ hours: -2, minutes: -5 }))
    assert.dom('*').hasText('-02:05')
  })
})
