import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupRenderingTest } from "ember-qunit";
import { module, skip } from "qunit";

module("Integration | Helper | format-duration-short", function (hooks) {
  setupRenderingTest(hooks);

  skip("it renders", async function (assert) {
    this.set("inputValue", "1234");

    await render(hbs`{{format-duration-short inputValue}}`);

    assert.equal(this.element.textContent.trim(), "1234");
  });
});
