import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('helper:trim', function(hooks) {
  setupRenderingTest(hooks)

  test('it renders', async function(assert) {
    await render(hbs`{{trim 'wazzzzzzup'}}`)
    assert.dom('*').hasText('wazzzzzzup')

    await render(hbs`{{trim 'wazzzzzzup' length=5}}`)
    assert.dom('*').hasText('wazzz...')
  })
})
