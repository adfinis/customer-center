import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import moment from 'moment'

moduleForComponent(
  'format-duration',
  'Integration | Helper | format duration',
  {
    integration: true
  }
)

test('formats a duration of 12 hours and 45 minutes as 12 Hours 45 Minutes', function(assert) {
  this.set('duration', moment.duration({ hours: 12, minutes: 45 }))

  this.render(hbs`{{format-duration duration}}`)

  assert.equal(
    this.$()
      .text()
      .trim(),
    '12 Hours 45 Minutes'
  )

  this.set('duration', moment.duration({ hours: 2, minutes: 5 }))

  assert.equal(
    this.$()
      .text()
      .trim(),
    '2 Hours 5 Minutes'
  )
})
