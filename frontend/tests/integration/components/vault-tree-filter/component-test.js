import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent(
  'vault-tree-filter',
  'Integration | Component | vault tree filter',
  {
    integration: true
  }
)

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{vault-tree-filter}}`)

  assert.equal(
    this.$()
      .text()
      .trim(),
    ''
  )

  // Template block usage:
  this.render(hbs`
    {{#vault-tree-filter}}
      template block text
    {{/vault-tree-filter}}
  `)

  assert.equal(
    this.$()
      .text()
      .trim(),
    'template block text'
  )
})
