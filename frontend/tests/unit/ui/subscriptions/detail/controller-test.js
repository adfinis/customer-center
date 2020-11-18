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

    assert.equal(controller.project, project);

    assert.deepEqual(controller.orders, orders.toArray());
    assert.equal(controller.ordersPage, 1);
    assert.equal(controller.ordersNext, true);

    assert.deepEqual(controller.reports, reports.toArray());
    assert.equal(controller.reportsPage, 1);
    assert.equal(controller.reportsNext, true);
  });
});
