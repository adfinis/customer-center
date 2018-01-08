import { moduleForModel, test } from 'ember-qunit'

moduleForModel('timed-user', 'Unit | Model | timed user', {
  needs: []
})

test('compute full name', function(assert) {
  let timedUser = this.subject({ firstName: 'Padme', lastName: 'Amidala' })
  assert.equal(timedUser.get('fullName'), 'Padme Amidala')
})
