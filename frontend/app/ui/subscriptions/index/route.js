import { inject as service } from "@ember/service";
import AuthenticatedRoute from "customer-center/routes/-authenticated";

export default class SubscriptionsIndexRoute extends AuthenticatedRoute {
  @service account;

  beforeModel() {
    super.beforeModel(...arguments);

    // Only admins get the full list while customers/users
    // get a simple overview over their own projects.
    if (this.account.isInGroups("one", ["adsy-user", "adsy-timed-admin"])) {
      this.transitionTo("subscriptions.list");
    } else {
      this.transitionTo("subscriptions.own");
    }
  }
}
