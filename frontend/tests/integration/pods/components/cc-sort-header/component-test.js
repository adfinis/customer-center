import { setupRenderingTest } from 'ember-qunit'
import { module, test } from 'qunit'
import 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import { click } from '@ember/test-helpers'

module('Integration | Component | cc sort header', function(hooks) {
  setupRenderingTest(hooks)

  test('cc-sort-header', async function(assert) {
    this.set('header', { attr: 'test' })

    await this.render(hbs`
      {{#cc-sort-header sort=sort attr=header.attr onSort=action}}
        <p data-test-header-name="0">test</p>
      {{/cc-sort-header}}
    `)

    assert.dom('[data-test-header-name="0"]').hasText('test')

    this.set('action', sort => {
      this.set('sort', sort)
      assert.equal(sort.order, 'desc')
      assert.equal(sort.attr, 'test')
      assert.dom('[data-test-sort-desc]').exists()
      assert.dom('[data-test-sort-asc]').doesNotExist()
    })
    await click('[data-test-sort]')

    this.set('action', sort => {
      this.set('sort', sort)
      assert.equal(sort.order, 'asc')
      assert.equal(sort.attr, 'test')
      assert.dom('[data-test-sort-asc]').exists()
      assert.dom('[data-test-sort-desc]').doesNotExist()
    })
    await click('[data-test-sort]')

    this.set('action', sort => {
      this.set('sort', sort)
      assert.equal(sort, null)
      assert.dom('[data-test-sort-asc]').doesNotExist()
      assert.dom('[data-test-sort-desc]').doesNotExist()
    })
    await click('[data-test-sort]')

    this.set('action', sort => {
      this.set('sort', sort)
      assert.equal(sort.order, 'desc')
      assert.equal(sort.attr, 'test')
      assert.dom('[data-test-sort-desc]').exists()
      assert.dom('[data-test-sort-asc]').doesNotExist()
    })
    await click('[data-test-sort]')
  })
})
