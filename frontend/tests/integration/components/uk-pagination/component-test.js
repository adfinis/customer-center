import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | uk-pagination', function(hooks) {
  setupRenderingTest(hooks)

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.setProperties({
      meta: {
        pagination: { page: 3, pages: 5, page_size: 10 }
      },
      links: {
        next: 'localhost?page_size=10&page=4',
        prev: 'localhost?page_size=10&page=2'
      },
      actions: {
        loadPage(page) {
          assert.equal(page, 3)
        }
      }
    })

    // Template block usage:
    await render(hbs`
      {{uk-pagination meta=meta.pagination links=links loadPage=(action 'loadPage')}}
    `)

    assert.equal(
      this.element.textContent.trim(),
      'Previous\n\nPage 3 of 5\n\n  Next'
    )
  })
})
