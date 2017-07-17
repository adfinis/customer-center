import { symonState } from '../../../helpers/symon-state'
import { module, test } from 'qunit'

module('Unit | Helper | symon state')

test('it works', function(assert) {
  assert.equal(symonState([0]), 'success')
})
