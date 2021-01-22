import { UnauthorizedError } from "@ember-data/adapter/error";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import config from "customer-center/config/environment";
import BaseRoute from "customer-center/routes/-base";

export default class AuthenticatedRoute extends BaseRoute {
  @service session;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, config.APP.loginRoute);
  }
}
