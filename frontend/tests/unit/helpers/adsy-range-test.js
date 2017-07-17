import { adsyRange } from '../../../helpers/adsy-range'
import { module, test } from 'qunit'

module('Unit | Helper | adsy range')

test('it works', function(assert) {
  assert.deepEqual(adsyRange([1, 3]), [1, 2, 3])
  assert.deepEqual(adsyRange([1, 5, 2]), [1, 3, 5])
  assert.deepEqual(adsyRange(['A', 'C']), ['A', 'B', 'C'])
})
