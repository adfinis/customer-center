import { moduleFor, test } from 'ember-qunit'

moduleFor('route:timescout/abo', 'Unit | Route | timescout/abo', {
  needs: ['service:timescout', 'service:notify', 'service:i18n']
})

test('it exists', function(assert) {
  const route = this.subject()
  assert.ok(route)
})
