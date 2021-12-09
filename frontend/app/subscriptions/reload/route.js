import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import ENV from "customer-center/config/environment";

export default class SubscriptionsReloadRoute extends Route {
  @service timed;
  @service account;
  @service notify;
  @service intl;

  beforeModel(transition) {
    super.beforeModel(transition);

    // Employees cannot recharge the subscription.
    if (
      !this.account.isInGroups("one", [
        ENV.auth.adminRole,
        ENV.auth.customerRole,
      ])
    ) {
      this.notify.error(this.intl.t("page.subscriptions.reload.no-access"));
      this.transitionTo(
        "subscriptions.detail",
        transition.to.params.project_id
      );
    }
  }

  async model(params) {
    const project = await this.timed.getProjectDetails(params.project_id);

    // Customers get a list of packages to choose from.
    let packages = [];
    if (this.account.isInGroup(ENV.auth.customerRole)) {
      const billing_type = project.billingType.get("id");
      packages = await this.timed.getReloadPackages(billing_type);
    }

    return {
      project,
      packages,
    };
  }
}
