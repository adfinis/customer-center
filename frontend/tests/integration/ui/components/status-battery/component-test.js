import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

const CLASS_WARNING = "status-battery--empty";

module("Integration | Component | status-battery", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    this.percentage = 0.5;

    await render(hbs`<StatusBattery @percentage={{this.percentage}} />`);

    assert.dom(".status-battery").doesNotHaveClass(CLASS_WARNING);
    assert.dom(".status-battery__body").hasAttribute("style", /height: 50%/i);
    assert
      .dom(".status-battery__body")
      // 243,216,0 is #F3D800 set through element.style
      .hasAttribute("style", /background-color: rgb\(243, 216, 0\)/i);
  });

  test("it has a warning styling", async function (assert) {
    this.warning = true;
    this.percentage = 0.05;

    await render(hbs`
      <StatusBattery
        @warning={{this.warning}}
        @percentage={{this.percentage}}
      />
    `);

    assert.dom(".status-battery").hasClass(CLASS_WARNING);
    assert.dom(".status-battery__body").hasAttribute("style", /height: 5%/i);
    assert
      .dom(".status-battery__body")
      // 255,0,0 is #FF0000 set through element.style
      .hasAttribute("style", /background-color: rgb\(255, 0, 0\)/i);
  });
});
