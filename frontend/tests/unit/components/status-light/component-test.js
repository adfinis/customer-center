import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('status-light', 'Integration | Component | status light', {
  integration: true
})

test('it renders', function(assert) {
  this.render(hbs`{{status-light}}`)

  assert.equal(this.$().text().trim(), '')
})
