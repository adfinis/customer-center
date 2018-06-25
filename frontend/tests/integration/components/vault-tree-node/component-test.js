import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | vault tree node', function(hooks) {
  setupRenderingTest(hooks)

  test('it renders', async function(assert) {
    await render(hbs`{{vault-tree-node}}`)

    assert.dom('*').hasText('')
  })
})
