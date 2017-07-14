import { moduleFor, test } from 'ember-qunit'

moduleFor('route:protected', 'Unit | Route | protected', {
  needs: ['service:session', 'service:i18n']
})

test('it exists', function(assert) {
  const route = this.subject()
  assert.ok(route)
})
