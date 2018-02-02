import { setupRenderingTest } from 'ember-qunit'
import { module, test } from 'qunit'
import 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import { click } from '@ember/test-helpers'

module('Integration | Component | cc sort header', function(hooks) {
  setupRenderingTest(hooks)

  test('cc-sort-header', async function(assert) {
    this.set('sort', null)
    this.set('header', { attr: 'test' })

    let counter = 0

    this.set('action', sort => {
      this.set('sort', sort)
      switch (counter) {
        case 0:
          assert.equal(sort.order, 'desc')
          assert.equal(sort.attr, 'test')
          assert.dom('[data-test-sort-desc]').exists()
          assert.dom('[data-test-sort-asc]').doesNotExist()
          counter += 1
          break
        case 1:
          assert.equal(sort.order, 'asc')
          assert.equal(sort.attr, 'test')
          assert.dom('[data-test-sort-asc]').exists()
          assert.dom('[data-test-sort-desc]').doesNotExist()
          counter += 1
          break
        case 2:
          assert.equal(sort, null)
          assert.dom('[data-test-sort-asc]').doesNotExist()
          assert.dom('[data-test-sort-desc]').doesNotExist()
          counter += 1
          break
        case 3:
          assert.equal(sort.order, 'desc')
          assert.equal(sort.attr, 'test')
          assert.dom('[data-test-sort-desc]').exists()
          assert.dom('[data-test-sort-asc]').doesNotExist()
          break
      }
    })

    await this.render(hbs`
      {{#cc-sort-header sort=sort attr=header.attr onSort=action}}
        <p data-test-header-name="0">test</p>
      {{/cc-sort-header}}
    `)

    assert.dom('[data-test-header-name="0"]').hasText('test')

    await click('[data-test-sort]')
    await click('[data-test-sort]')
    await click('[data-test-sort]')
    await click('[data-test-sort]')
  })
})
