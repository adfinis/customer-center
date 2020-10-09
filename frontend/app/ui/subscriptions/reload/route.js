import { inject as service } from "@ember/service";
import AuthenticatedRoute from "customer-center/routes/-authenticated";

export default class SubscriptionsReloadRoute extends AuthenticatedRoute {
  @service timed;
  @service account;

  async model(params) {
    const { project_id } = params;

    if (!this.account.isAdmin && !this.account.isCustomer) {
      this.transitionTo("subscriptions.detail", project_id);
      return;
    }

    const project = await this.timed.getProjectDetails(project_id);

    let packages = [];
    if (this.account.isCustomer) {
      const billing_type = project.get("billingType.id");
      packages = await this.timed.getReloadPackages(billing_type);
    }

    return {
      project,
      packages,
    };
  }
}
