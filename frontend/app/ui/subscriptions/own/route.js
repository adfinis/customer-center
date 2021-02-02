import { inject as service } from "@ember/service";
import AuthenticatedRoute from "customer-center/routes/-authenticated";

export default class SubscriptionsOwnRoute extends AuthenticatedRoute {
  @service timed;

  model() {
    return this.timed.getOwnProjects();
  }
}
