import { inject as service } from "@ember/service";
import AuthenticatedRoute from "customer-center/routes/-authenticated";

export default class SubscriptionsReloadRoute extends AuthenticatedRoute {
  @service timed;
  @service account;
  @service notify;
  @service intl;

  beforeModel(transition) {
    // Normal users cannot recharge the subscription.
    if (!this.account.isAdmin && !this.account.isCustomer) {
      this.notify.error(this.intl.t("page.subscriptions.reload.no-access"));
      this.transitionTo(
        "subscriptions.detail",
        transition.to.params.project_id
      );
      return;
    }
  }

  async model(params) {
    const project = await this.timed.getProjectDetails(params.project_id);

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
