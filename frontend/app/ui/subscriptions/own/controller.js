import Controller from "@ember/controller";
import { alias } from "@ember/object/computed";
import { inject as service } from "@ember/service";

export default class SubscriptionsOwnController extends Controller {
  @service account;
  @service intl;

  @alias("model") projects;

  get showReloadLink() {
    return this.account.isInGroups("one", ["admin", "adsy-customer"]);
  }

  breadcrumbs = [
    { label: this.intl.t("page.subscriptions.title"), route: "subscriptions" },
    { label: this.intl.t("page.subscriptions.own.title") },
  ];
}
