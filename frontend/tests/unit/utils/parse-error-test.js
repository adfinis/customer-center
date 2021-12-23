import parseError from "customer-center/utils/parse-error";
import { module, test } from "qunit";

module("Unit | Utility | parse-error", function () {
  test("it works", function (assert) {
    const error = new Error("Test");

    const expected = "Test";
    const result = parseError(error);

    assert.strictEqual(result, expected);
  });
});
