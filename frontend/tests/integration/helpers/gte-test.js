import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Helper | gte', function(hooks) {
  setupRenderingTest(hooks)

  test('it renders', async function(assert) {
    await render(hbs`{{gte 15 10}}`)
    assert.equal(this.element.textContent.trim(), 'true')

    await render(hbs`{{gte 10 10}}`)
    assert.equal(this.element.textContent.trim(), 'true')

    await render(hbs`{{gte 10 15}}`)
    assert.equal(this.element.textContent.trim(), 'false')
  })
})
