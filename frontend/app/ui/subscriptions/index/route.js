import { inject as service } from "@ember/service";
import AuthenticatedRoute from "customer-center/routes/-authenticated";

export default class SubscriptionsIndexRoute extends AuthenticatedRoute {
  @service account;

  beforeModel() {
    super.beforeModel(...arguments);

    if (this.account.isAdmin) {
      this.transitionTo("subscriptions.list");
    } else {
      this.transitionTo("subscriptions.own");
    }
  }
}
