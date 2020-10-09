import { inject as service } from "@ember/service";
import BaseRoute from "customer-center/routes/-base";

export default class AuthenticatedRoute extends BaseRoute {
  @service session;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, "account.login");
  }
}
