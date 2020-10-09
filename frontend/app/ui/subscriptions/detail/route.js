import { inject as service } from "@ember/service";
import AuthenticatedRoute from "customer-center/routes/-authenticated";
import { hash } from "rsvp";

export default class SubscriptionsDetailRoute extends AuthenticatedRoute {
  @service timed;

  model(params) {
    const { project_id } = params;

    return hash({
      project: this.timed.getProjectDetails(project_id),
      reports: this.timed.getProjectReports(project_id),
      orders: this.timed.getProjectOrders(project_id),
    });
  }
}
