import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('trim', 'helper:trim', {
  integration: true
})

test('it renders', function(assert) {
  this.render(hbs`{{trim 'wazzzzzzup'}}`)
  assert.equal(this.$().text().trim(), 'wazzzzzzup')

  this.render(hbs`{{trim 'wazzzzzzup' length=5}}`)
  assert.equal(this.$().text().trim(), 'wazzz...')
})
