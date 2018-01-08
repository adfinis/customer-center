import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import moment from 'moment'

moduleForComponent(
  'format-duration-short',
  'Integration | Helper | format duration short',
  {
    integration: true
  }
)

test('formats a duration of 12 hours and 45 minutes as 12:45', function(assert) {
  this.set('duration', moment.duration({ hours: 12, minutes: 45 }))

  this.render(hbs`{{format-duration-short duration}}`)

  assert.equal(
    this.$()
      .text()
      .trim(),
    '12:45'
  )
  this.set('duration', moment.duration({ hours: 2, minutes: 5 }))

  assert.equal(
    this.$()
      .text()
      .trim(),
    '02:05'
  )
})
