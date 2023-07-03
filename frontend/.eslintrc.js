"use strict";

module.exports = {
  settings: {
    "import/internal-regex": "^customer-center/",
  },
  extends: ["@adfinis/eslint-config/ember-addon"],
  rules: {
    "ember/no-settled-after-test-helper": "warn",
  },
};