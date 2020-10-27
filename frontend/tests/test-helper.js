import { setApplication } from "@ember/test-helpers";
import Application from "customer-center/app";
import config from "customer-center/config/environment";
import { start } from "ember-qunit";

setApplication(Application.create(config.APP));

start();
