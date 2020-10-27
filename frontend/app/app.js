import Application from "@ember/application";
import { InitSentryForEmber } from "@sentry/ember";
import config from "customer-center/config/environment";
import loadInitializers from "ember-load-initializers";
import Resolver from "ember-resolver";

InitSentryForEmber();

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
