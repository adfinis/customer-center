import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupRenderingTest } from "ember-qunit";
import { module, skip } from "qunit";

module("Integration | Component | project-info", function (hooks) {
  setupRenderingTest(hooks);

  skip("it renders", async function (assert) {
    this.project = {
      name: "Project #1",
      customer: {
        name: "Customer #1",
      },
      billingType: {
        name: "Billing type #1",
      },
      totalTime: "",
      unconfirmedTime: "",
    };

    await render(hbs`<ProjectInfo @project={{this.project}} />`);
    assert.ok(this.element);
  });
});
