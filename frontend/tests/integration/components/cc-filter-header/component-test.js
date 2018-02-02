import { setupRenderingTest } from 'ember-qunit'
import { module, test } from 'qunit'
import 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import { click, fillIn, triggerKeyEvent } from '@ember/test-helpers'

module('Integration | Component | cc filter header', function(hooks) {
  setupRenderingTest(hooks)

  test('cc-filter-header', async function(assert) {
    this.set('search', null)
    this.set('header', { attr: 'test' })

    this.set('actions', {
      search: function(search) {
        assert.equal(search.term, '123')
        assert.equal(search.attr, 'test')
      }
    })

    await this.render(hbs`
      {{#cc-filter-header search=search attr=header.attr onSearch=(action 'search')}}
        <p data-test-header-name="0">test</p>
      {{/cc-filter-header}}
    `)

    assert.dom('[data-test-header-name="0"]').hasText('test')

    await click('[data-test-search]')
    await fillIn('[data-test-input]', '123')
    await triggerKeyEvent('[data-test-input]', 'keyup', '1')
  })
})
