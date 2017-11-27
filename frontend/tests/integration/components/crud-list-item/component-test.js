import EmberObject from '@ember/object'
import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import wait from 'ember-test-helpers/wait'

moduleForComponent(
  'crud-list-item',
  'Integration | Component | crud list item',
  {
    integration: true
  }
)

test('it renders', function(assert) {
  assert.expect(2)

  this.set(
    'entry',
    EmberObject.create({
      key: 'Key',
      value: 'Value',
      comment: 'Comment',
      edit: false
    })
  )

  this.render(hbs`{{crud-list-item entry=entry edit=entry.edit index=0}}`)

  assert.equal(
    this.$('span.value')
      .text()
      .trim(),
    '********',
    'password is masked'
  )

  this.$('.uk-icon-button[uk-icon="search"]').click()

  return wait().then(() => {
    assert.equal(
      this.$('span.value')
        .text()
        .trim(),
      'Value',
      'password is visible'
    )
  })
})
