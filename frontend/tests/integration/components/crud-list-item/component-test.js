import { moduleForComponent, test } from 'ember-qunit'
import Ember from 'ember'
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
  let item = Ember.Object.create({
    key: 'Key',
    value: 'Value',
    comment: 'Comment',
    edit: false
  })
  this.set('entry', item)
  this.render(hbs`{{crud-list-item entry=entry edit=entry.edit index=0}}`)
  assert.equal(
    this.$('span.value').text().trim(),
    '********',
    'password is masked'
  )
  Ember.run(() => document.querySelector('.btn--show').click())
  assert.equal(
    this.$('span.value').text().trim(),
    'Value',
    'password is visible'
  )
})
