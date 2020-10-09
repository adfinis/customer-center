import { inject as service } from "@ember/service";
import BaseRoute from "customer-center/routes/-base";

export default class AccountLogoutRoute extends BaseRoute {
  @service session;
  @service notify;
  @service intl;

  async beforeModel(transition) {
    await this.session.invalidate();

    this.notify.success(this.intl.t("page.account.logout.success"));

    this.transitionTo("index");
  }
}
