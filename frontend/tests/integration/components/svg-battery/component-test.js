import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render, waitUntil } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | svg-battery', function(hooks) {
  setupRenderingTest(hooks)

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{svg-battery percentage=0.4}}`)

    assert.equal(this.element.textContent.trim(), '')
    assert.equal(
      this.element.querySelector('.power').getAttribute('fill'),
      '#F6A400'
    )

    await waitUntil(
      () =>
        this.element.querySelector('.power').getAttribute('height') == 140.4,
      { timeout: 2000 }
    )
    assert.equal(
      this.element.querySelector('.power').getAttribute('height'),
      '140.4'
    )
  })
})
