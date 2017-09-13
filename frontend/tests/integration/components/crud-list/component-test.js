import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('crud-list', 'Integration | Component | crud list', {
  integration: true
})

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{crud-list title="Test"}}`)

  assert.ok(
    this.$()
      .text()
      .trim()
  )
})
