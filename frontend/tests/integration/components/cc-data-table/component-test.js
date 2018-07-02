import { setupRenderingTest } from 'ember-qunit'
import { module, test } from 'qunit'
import 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import moment from 'moment'
import EmberObject from '@ember/object'
import { click, fillIn, triggerKeyEvent } from '@ember/test-helpers'
import { computed } from '@ember/object'

module('Integration | Component | cc data table', function(hooks) {
  setupRenderingTest(hooks)

  test('cc data table', async function(assert) {
    let customSort = (data, { attr }) => {
      assert.equal(attr, 'custom')
      return data
    }

    this.set('headers', [
      {
        type: 'search',
        title: 'test',
        attr: 'name'
      },
      {
        type: 'sort',
        title: 'test',
        attr: 'name'
      },
      {
        type: 'sort',
        title: 'custom test',
        attr: 'custom',
        customFilter: customSort
      },
      {
        title: 'test',
        attr: 'desc'
      }
    ])

    this.set(
      'model',
      computed(() => [
        EmberObject.extend({
          name: 'ABC',
          time: moment.duration(3, 'hours')
        }).create(),
        EmberObject.extend({
          name: 'CDE',
          time: moment.duration(5, 'hours')
        }).create(),
        EmberObject.extend({
          name: 'BCD',
          time: moment.duration(4, 'hours')
        }).create()
      ])
    )

    await this.render(hbs`
      {{#cc-data-table headers=headers model=model as |results|}}
        {{#each results as |project index|}}
          <tr data-test-row={{index}} class={{if project.isTimeAlmostConsumed 'danger' 'reset'}}>
            <td data-test-name={{index}}>{{project.name}}</td>
            <td data-test-time={{index}}>{{format-duration-short project.time}}</td>
            <td data-test-time-custom={{index}}>{{format-duration-short project.time}}</td>
            <td data-test-desc={{index}}>{{project.desc}}</td>
          </tr>
        {{else}}{{t 'global.empty'}}{{/each}}
      {{/cc-data-table}}
    `)

    assert.equal(this.element.querySelectorAll('[data-test-row]').length, 3)

    // sorting desc
    // the first sort is default
    await click(this.element.querySelectorAll('[data-test-sort]')[0])
    assert.dom('[data-test-name="0"]').hasText('ABC')
    assert.dom('[data-test-name="1"]').hasText('BCD')
    assert.dom('[data-test-name="2"]').hasText('CDE')

    //sorting asc
    await click(this.element.querySelectorAll('[data-test-sort]')[0])
    assert.dom('[data-test-name="0"]').hasText('CDE')
    assert.dom('[data-test-name="1"]').hasText('BCD')
    assert.dom('[data-test-name="2"]').hasText('ABC')

    //sorting none
    await click(this.element.querySelectorAll('[data-test-sort]')[0])
    assert.dom('[data-test-name="0"]').hasText('ABC')
    assert.dom('[data-test-name="1"]').hasText('CDE')
    assert.dom('[data-test-name="2"]').hasText('BCD')

    // custom sorting
    // the second sort is custom
    await click(this.element.querySelectorAll('[data-test-sort]')[1])

    //filtering
    await click('[data-test-search]')
    await fillIn('[data-test-input]', 'A')
    await triggerKeyEvent('[data-test-input]', 'keyup', 65)

    assert.equal(this.element.querySelectorAll('[data-test-row]').length, 1)
    assert.dom('[data-test-name="0"]').hasText('ABC')

    await fillIn('[data-test-input]', 'b')
    await triggerKeyEvent('[data-test-input]', 'keyup', 65)

    assert.equal(this.element.querySelectorAll('[data-test-row]').length, 2)
    assert.dom('[data-test-name="0"]').hasText('ABC')
    assert.dom('[data-test-name="1"]').hasText('BCD')

    await click('[data-test-clear-search]')
    assert.equal(this.element.querySelectorAll('[data-test-row]').length, 3)
    assert.dom('[data-test-name="0"]').hasText('ABC')
    assert.dom('[data-test-name="1"]').hasText('CDE')
    assert.dom('[data-test-name="2"]').hasText('BCD')

    //checks for danger class
    assert.dom('[data-test-row="0"]').hasClass = 'danger'
  })
})
