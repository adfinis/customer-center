import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | rt', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let adapter = this.owner.lookup('adapter:rt');
    assert.ok(adapter);
  });
});
