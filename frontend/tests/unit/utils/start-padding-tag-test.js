import startPaddingTag from 'customer-center/utils/start-padding-tag'
import { module, test } from 'qunit'

module('Unit | Utility | start padding tag', function() {
  test('startPad test', function(assert) {
    let tag = startPaddingTag(10, '-')
    let a = 'Hello',
      b = 'World'
    let result = tag`${a} ${b}`
    assert.equal(result, '-----Hello -----World')

    tag = startPaddingTag(10, ' ')
    a = 'Hello'
    b = 'World'
    result = tag`${a} ${b}`
    assert.equal(result, '     Hello      World')

    tag = startPaddingTag(2)
    a = 0
    b = 0
    result = tag`${a}:${b}`
    assert.equal(result, '00:00')
  })
})
