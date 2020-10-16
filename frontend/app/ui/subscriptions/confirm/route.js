import { inject as service } from "@ember/service";
import AuthenticatedRoute from "customer-center/routes/-authenticated";

export default class SubscriptionsConfirmRoute extends AuthenticatedRoute {
  @service timed;
  @service account;

  beforeModel(transition) {
    // Only admin can confirm orders.
    if (!this.account.isAdmin) {
      this.transitionTo("subscriptions.index");
    }
  }

  model() {
    return this.timed.getUnconfirmedOrders();
  }
}
