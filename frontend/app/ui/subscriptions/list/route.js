import { inject as service } from "@ember/service";
import AuthenticatedRoute from "customer-center/routes/-authenticated";
import ENV from "customer-center/config/environment";

export default class SubscriptionsListRoute extends AuthenticatedRoute {
  @service timed;
  @service account;

  beforeModel(transition) {
    super.beforeModel(transition);

    // Customers/users don't have access to the full list.
    if (
      !this.account.isInGroups("one", [
        ENV.auth.employeeRole,
        ENV.auth.adminRole,
      ])
    ) {
      this.transitionTo("subscriptions.own");
    }
  }

  model() {
    return this.timed.getAllProjects();
  }
}
