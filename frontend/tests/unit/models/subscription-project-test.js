import ENV from "customer-center/config/environment";
import { setupTest } from "ember-qunit";
import moment from "moment";
import { module, test } from "qunit";

module("Unit | Model | timed subscription project", function (hooks) {
  setupTest(hooks);

  test("it exists", function (assert) {
    const store = this.owner.lookup("service:store");
    const model = store.createRecord("timed-subscription-project", {});
    assert.ok(model);
  });

  test("it works", function (assert) {
    const store = this.owner.lookup("service:store");

    const model = store.createRecord("timed-subscription-project", {
      name: "Project #1",
      purchasedTime: moment.duration(4, "hours"),
      spentTime: moment.duration(2, "hours"),
      orders: [
        store.createRecord("timed-subscription-order", {
          acknowledged: true,
          duration: moment.duration(5, "hours"),
        }),
        store.createRecord("timed-subscription-order", {
          acknowledged: false,
          duration: moment.duration(5, "hours"),
        }),
        store.createRecord("timed-subscription-order", {
          acknowledged: false,
          duration: moment.duration(5, "hours"),
        }),
      ],
    });

    assert.equal(model.totalTime.as("hours"), 2);
    assert.equal(model.unconfirmedTime.as("hours"), 10);
    assert.equal(model.percentage, 0.5);
  });

  test("it warns when time is almost up", function (assert) {
    const store = this.owner.lookup("service:store");

    const model_warn = store.createRecord("timed-subscription-project", {
      name: "Project #1",
      purchasedTime: moment.duration(ENV.APP.alertTime, "hours"),
      spentTime: moment.duration(0, "hours"),
    });

    assert.equal(model_warn.isTimeAlmostConsumed, true);

    const model_ok = store.createRecord("timed-subscription-project", {
      name: "Project #2",
      purchasedTime: moment.duration(ENV.APP.alertTime + 1, "hours"),
      spentTime: moment.duration(0, "hours"),
    });

    assert.equal(model_ok.isTimeAlmostConsumed, false);
  });
});
