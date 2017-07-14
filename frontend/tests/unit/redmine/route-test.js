import { moduleFor, test } from 'ember-qunit'

moduleFor('route:redmine', 'Unit | Route | redmine', {
  needs: ['service:redmine', 'service:i18n']
})

test('it exists', function(assert) {
  const route = this.subject()
  assert.ok(route)
})
