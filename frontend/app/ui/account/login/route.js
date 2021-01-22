import { inject as service } from "@ember/service";
import BaseRoute from "customer-center/routes/-base";

export default class AccountLoginRoute extends BaseRoute {
  @service session;

  beforeModel(transition) {
    this.session.prohibitAuthentication("index");
  }

  model() {
    return {
      username: "",
      password: "",
    };
  }
}
