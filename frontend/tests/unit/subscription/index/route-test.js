import { moduleFor, test } from 'ember-qunit'

moduleFor('route:timescout/index', 'Unit | Route | timescout/index', {
  needs: ['service:timescout']
})

test('it exists', function(assert) {
  const route = this.subject()
  assert.ok(route)
})
