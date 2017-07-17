import { moduleFor, test } from 'ember-qunit'

moduleFor('route:symon', 'Unit | Route | symon', {
  needs: ['service:symon']
})

test('it exists', function(assert) {
  const route = this.subject()
  assert.ok(route)
})
