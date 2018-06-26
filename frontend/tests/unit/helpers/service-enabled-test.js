import { module, test } from 'qunit'
import { serviceEnabled } from 'customer-center/helpers/service-enabled'

module('Unit | Helper | service enabled', function() {
  test('is service enabled', function(assert) {
    assert.ok(serviceEnabled(['sysupport']))
    assert.notOk(serviceEnabled(['servicexyz']))
  })
})
