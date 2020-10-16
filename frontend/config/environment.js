"use strict";

const { name } = require("../package");

module.exports = function (environment) {
  const ENV = {
    environment,
    modulePrefix: name,
    podModulePrefix: `${name}/ui`,

    rootURL: "/",
    locationType: "auto",

    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    moment: {
      includeLocales: ["de"],
    },

    "@sentry/ember": {
      environment,
      sentry: {},
    },

    APP: {
      // These are used in the account service.
      adminGroup: "adsy-timed-admin",
      customerGroup: "adsy-customer",

      // Define alertTime in hours.
      // When total time comes close to alertTime, text color changes.
      alertTime: 5,
    },
  };

  if (environment === "development") {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === "test") {
    // Testem prefers this...
    ENV.locationType = "none";

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = "#ember-testing";
    ENV.APP.autoboot = false;
  }

  if (environment === "production") {
    // https://docs.sentry.io/platforms/javascript/guides/ember/configuration/
    ENV["@sentry/ember"].sentry.dsn = process.env.SENTRY_DSN;
  }

  return ENV;
};
