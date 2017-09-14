import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent(
  'cc-sidenav-body',
  'Integration | Component | cc sidenav body',
  {
    integration: true
  }
)

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{cc-sidenav-body}}`)

  assert.ok(
    this.$()
      .text()
      .trim()
  )
})
