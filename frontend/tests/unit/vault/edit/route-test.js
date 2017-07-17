import { moduleFor, test } from 'ember-qunit'

moduleFor('route:vault/edit', 'Unit | Route | vault/edit', {
  needs: ['service:vault', 'service:notify', 'service:i18n']
})

test('it exists', function(assert) {
  let route = this.subject()
  assert.ok(route)
})
