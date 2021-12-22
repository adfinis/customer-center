import { setupTest } from "ember-qunit";
import { module, test } from "qunit";

module("Unit | Controller | info", function (hooks) {
  setupTest(hooks);

  test("it exists", function (assert) {
    const controller = this.owner.lookup("controller:info");
    assert.ok(controller);
  });
});
