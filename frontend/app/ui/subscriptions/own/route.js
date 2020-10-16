import { inject as service } from "@ember/service";
import AuthenticatedRoute from "customer-center/routes/-authenticated";

export default class SubscriptionsOwnRoute extends AuthenticatedRoute {
  @service timed;
  @service account;

  beforeModel(transition) {
    // Admins have too many projects for this view.
    if (this.account.isAdmin) {
      this.transitionTo("subscriptions.index");
    }
  }

  model() {
    return this.timed.getOwnProjects();
  }
}
