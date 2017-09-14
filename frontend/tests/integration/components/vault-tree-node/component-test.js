import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent(
  'vault-tree-node',
  'Integration | Component | vault tree node',
  {
    integration: true
  }
)

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{vault-tree-node}}`)

  assert.equal(
    this.$()
      .text()
      .trim(),
    ''
  )
})
