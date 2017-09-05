import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('text-clip', 'Integration | Component | text clip', {
  integration: true
})

test('it renders', function(assert) {
  this.render(hbs`{{text-clip 'wazzzzzzup'}}`)
  assert.equal(this.$().text().trim(), 'wazzzzzzup')

  this.render(hbs`{{text-clip 'wazzzzzzup' length=5}}`)
  assert.equal(this.$().text().trim(), 'wazzz...')
})
