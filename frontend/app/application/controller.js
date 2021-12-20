import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import ENV from "customer-center/config/environment";

export default class ApplicationController extends Controller {
  @service account;
  @service session;
  @service intl;

  get showConfirmInMenu() {
    return this.account.isInGroup(ENV.auth.adminRole);
  }

  get languages() {
    return this.intl.locales.map((locale) => ({
      key: locale,
      label: locale.toUpperCase(),
    }));
  }

  @action async changeLanguage(language) {
    await this.account.changeLanguage(language);
  }

  @action invalidateSession() {
    this.session.singleLogout();
  }
}
