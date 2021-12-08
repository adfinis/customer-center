import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default class AccountPasswordConfirmRoute extends Route {
  @service session;

  beforeModel(transition) {
    this.session.prohibitAuthentication("index");
  }

  async model(params) {
    const { token } = params;

    const response = await fetch(`/api/v1/reset-password/${token}`);

    if (!response.ok) {
      this.transitionTo("account.password-reset");
    } else {
      const { data } = await response.json();
      return data;
    }
  }
}
