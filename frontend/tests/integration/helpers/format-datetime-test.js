import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

import moment from 'moment'

module('Integration | Helper | format-django-datetime', function(hooks) {
  setupRenderingTest(hooks)

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('inputValue', moment('2018-02-08 09:30'))

    await render(hbs`{{format-datetime inputValue}}`)

    assert.equal(this.element.textContent.trim(), '9:30 08.02.2018')
  })
})
