import Controller from "@ember/controller";
import { alias } from "@ember/object/computed";
import { inject as service } from "@ember/service";

export default class AccountPasswordConfirmController extends Controller {
  @service intl;

  @alias("model.password") password;

  breadcrumbs = [
    { label: this.intl.t("page.account.title"), route: "account" },
    { label: this.intl.t("page.account.password-confirm.title") },
  ];
}
