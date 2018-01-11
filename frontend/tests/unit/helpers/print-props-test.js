import { printProps } from 'customer-center/helpers/print-props'
import { module, test } from 'qunit'

module('Unit | Helper | print props')

// Replace this with your real tests.
test('it works', function(assert) {
  let result = printProps([
    {
      a: 'b',
      c: 'd'
    }
  ])
  assert.equal(result, 'b - d')
})
