import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('symon-hosts', 'Integration | Component | symon hosts', {
  integration: true
})

test('it renders', function(assert) {
  this.render(hbs`{{symon-hosts}}`)

  assert.ok(this.$().text().trim())
})
