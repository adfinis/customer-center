import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('input-or-show', 'Integration | Component | input or show', {
  integration: true
})

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{input-or-show}}`)

  assert.equal(
    this.$()
      .text()
      .trim(),
    ''
  )
})
