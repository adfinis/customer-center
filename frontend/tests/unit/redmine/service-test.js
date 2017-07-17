import { moduleFor, test } from 'ember-qunit'

moduleFor('service:redmine', 'Unit | Service | redmine', {
  needs: ['service:ajax']
})

// Replace this with your real tests.
test('it exists', function(assert) {
  const service = this.subject()
  assert.ok(service)
})
