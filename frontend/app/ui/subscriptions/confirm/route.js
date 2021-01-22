import { inject as service } from "@ember/service";
import AuthenticatedRoute from "customer-center/routes/-authenticated";

export default class SubscriptionsConfirmRoute extends AuthenticatedRoute {
  @service timed;
  @service account;
  @service notify;
  @service intl;

  beforeModel(transition) {
    super.beforeModel(transition);

    if (!this.account.isInGroup("adsy-timed-admin")) {
      this.notify.error(this.intl.t("page.subscriptions.confirm.no-access"));
      this.transitionTo("subscriptions.index");
    }
  }

  model() {
    return this.timed.getUnconfirmedOrders();
  }
}
