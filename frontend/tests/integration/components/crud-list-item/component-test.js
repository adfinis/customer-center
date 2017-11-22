import { run } from '@ember/runloop'
import EmberObject from '@ember/object'
import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent(
  'crud-list-item',
  'Integration | Component | crud list item',
  {
    integration: true
  }
)

test('it renders', function(assert) {
  assert.expect(2)
  let item = EmberObject.create({
    key: 'Key',
    value: 'Value',
    comment: 'Comment',
    edit: false
  })
  this.set('entry', item)
  this.render(hbs`{{crud-list-item entry=entry edit=entry.edit index=0}}`)
  assert.equal(
    this.$('span.value')
      .text()
      .trim(),
    '********',
    'password is masked'
  )
  run(() => document.querySelector('.btn--show').click())
  assert.equal(
    this.$('span.value')
      .text()
      .trim(),
    'Value',
    'password is visible'
  )
})
