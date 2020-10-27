import Route from "@ember/routing/route";

export default class AccountPasswordConfirmRoute extends Route {
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
