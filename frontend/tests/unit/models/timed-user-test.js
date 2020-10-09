import { setupTest } from "ember-qunit";
import { module, test } from "qunit";

module("Unit | Model | timed user", function (hooks) {
  setupTest(hooks);

  test("it exists", function (assert) {
    const store = this.owner.lookup("service:store");
    const model = store.createRecord("timed-user", {});
    assert.ok(model);
  });

  test("it computes the full name", function (assert) {
    const store = this.owner.lookup("service:store");

    const model_full = store.createRecord("timed-user", {
      firstName: "John",
      lastName: "Doe",
    });

    const model_first = store.createRecord("timed-user", {
      firstName: "John",
    });

    const model_last = store.createRecord("timed-user", {
      lastName: "Doe",
    });

    assert.equal(model_full.fullName, "John Doe");
    assert.equal(model_first.fullName, "John");
    assert.equal(model_last.fullName, "Doe");
  });
});
