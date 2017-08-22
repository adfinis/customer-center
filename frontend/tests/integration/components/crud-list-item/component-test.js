import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent(
  'crud-list-item',
  'Integration | Component | crud list item',
  {
    integration: true
  }
)

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{crud-list-item}}`)

  assert.equal(this.$().text().trim(), '')

  // Template block usage:
  this.render(hbs`
    {{#crud-list-item}}
      template block text
    {{/crud-list-item}}
  `)

  assert.equal(this.$().text().trim(), 'template block text')
})
