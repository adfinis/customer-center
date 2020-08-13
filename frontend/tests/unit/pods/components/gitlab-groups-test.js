import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'

module('Unit | Component | gitlab-projects', function(hooks) {
  setupTest(hooks)

  test('[T11] Search in group component', async function(assert) {
    let component = this.owner.lookup('component:gitlab-groups')
    component.set('model', {
      projects: [
        { name: 'abc' },
        { name: 'bcd' },
        { name: 'cde' },
        { name: 'def' }
      ]
    })
    component.set('filter', { search: 'c' })
    assert.equal(component.get('projects')[0].name, 'abc')
    assert.equal(component.get('projects')[1].name, 'bcd')
    assert.equal(component.get('projects')[2].name, 'cde')
    assert.equal(component.get('projects').length, 3)

    component.set('filter', { search: '' })
    assert.equal(component.get('projects')[0].name, 'abc')
    assert.equal(component.get('projects')[1].name, 'bcd')
    assert.equal(component.get('projects')[2].name, 'cde')
    assert.equal(component.get('projects')[3].name, 'def')
    assert.equal(component.get('projects').length, 4)
  })
})
