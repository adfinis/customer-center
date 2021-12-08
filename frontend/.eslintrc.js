"use strict";

module.exports = {
  extends: "@adfinis-sygroup/eslint-config/ember-app",

  rules: {
    "no-unused-vars": "off",
    "prefer-rest-params": "off",
    "ember/use-brace-expansion": "off",
    "ember/no-get": "off",
    "ember/no-mixins": "warn",
  },
};
