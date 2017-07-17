import { moduleFor, test } from 'ember-qunit'

moduleFor('route:user/profile', 'Unit | Route | user/profile', {
  needs: ['service:session', 'service:ajax']
})

test('it exists', function(assert) {
  const route = this.subject()
  assert.ok(route)
})
