import { inject as service } from "@ember/service";
import AuthenticatedRoute from "customer-center/routes/-authenticated";

export default class SubscriptionsReloadRoute extends AuthenticatedRoute {
  @service timed;
  @service account;
  @service notify;
  @service intl;

  async model(params) {
    const { project_id } = params;

    // Normal users cannot recharge the subscription.
    if (!this.account.isAdmin && !this.account.isCustomer) {
      this.notify.error(this.intl.t("page.subscriptions.reload.no-access"));
      this.transitionTo("subscriptions.detail", project_id);
      return;
    }

    const project = await this.timed.getProjectDetails(project_id);

    // Customers get a list of packages to choose from.
    let packages = [];
    if (this.account.isCustomer) {
      const billing_type = project.billingType.get("id");
      packages = await this.timed.getReloadPackages(billing_type);
    }

    return {
      project,
      packages,
    };
  }
}
