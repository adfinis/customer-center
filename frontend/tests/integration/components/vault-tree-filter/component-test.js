import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | vault tree filter', function(hooks) {
  setupRenderingTest(hooks)

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{vault-tree-filter}}`)

    assert.dom('*').hasText('')

    // Template block usage:
    await render(hbs`
      {{#vault-tree-filter}}
        template block text
      {{/vault-tree-filter}}
    `)

    assert.dom('*').hasText('template block text')
  })
})
