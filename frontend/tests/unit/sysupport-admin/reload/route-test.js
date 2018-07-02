import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | sysupport-admin/custom-reload', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:sysupport-admin/custom-reload');
    assert.ok(route);
  });
});
