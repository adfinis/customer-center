import { A } from "@ember/array";
import { setupIntl } from "ember-intl/test-support";
import { setupTest } from "ember-qunit";
import { module, test } from "qunit";

module("Unit | Controller | subscriptions/detail", function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, "en");

  test("it exists", function (assert) {
    const controller = this.owner.lookup("controller:subscriptions/detail");
    assert.ok(controller);
  });

  test("it works", function (assert) {
    const controller = this.owner.lookup("controller:subscriptions/detail");

    const project = {};
    const orders = [];
    orders.links = { next: "..." };
    const reports = [];
    reports.links = { next: "..." };

    const model = { project, orders, reports };
    controller.setup(model);

    assert.deepEqual(controller.project, project);

    assert.deepEqual(controller.orders, orders.toArray());
    assert.strictEqual(controller.ordersPage, 1);
    assert.true(controller.ordersNext);

    assert.deepEqual(controller.reports, reports.toArray());
    assert.strictEqual(controller.reportsPage, 1);
    assert.true(controller.reportsNext);
  });
});
