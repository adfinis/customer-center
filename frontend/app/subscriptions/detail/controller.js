import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import ENV from "customer-center/config/environment";

export default class SubscriptionsDetailController extends Controller {
  @service account;
  @service intl;
  @service timed;

  @tracked project;

  get showReloadButton() {
    return this.account.isInGroups("one", [
      ENV.auth.adminRole,
      ENV.auth.customerRole,
    ]);
  }

  get breadcrumbs() {
    return [{ label: this.project.name }];
  }

  setup(model, transition) {
    this.project = model.project;
  }
}
