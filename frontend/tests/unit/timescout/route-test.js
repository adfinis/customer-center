import { moduleFor, test } from 'ember-qunit'

moduleFor('route:timescout', 'Unit | Route | timescout', {
  needs: ['service:timescout']
})

test('it exists', function(assert) {
  const route = this.subject()
  assert.ok(route)
})
