import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

module("Integration | Component | status-battery", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    this.percentage = 0.5;

    await render(hbs`<StatusBattery @percentage={{this.percentage}} />`);

    assert.ok(this.element);
  });
});
