import { setupIntl } from "ember-intl/test-support";
import { setupTest } from "ember-qunit";
import { module, test } from "qunit";

module("Unit | Controller | index", function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, "en");

  test("it exists", function (assert) {
    const controller = this.owner.lookup("controller:index");
    assert.ok(controller);
  });

  test("it works", function (assert) {
    const controller = this.owner.lookup("controller:index");

    const projects = [];
    const locations = [];
    const support = [];
    const profiles = [];

    controller.model = { projects, locations, support, profiles };

    assert.equal(controller.projects, projects);
    assert.equal(controller.locations, locations);
    assert.equal(controller.support, support);
    assert.equal(controller.profiles, profiles);
  });
});
