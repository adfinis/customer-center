import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default class ApplicationController extends Controller {
  @service account;
  @service session;
  @service intl;

  get languages() {
    return this.intl.locales.map((locale) => ({
      key: locale,
      label: locale.toUpperCase(),
    }));
  }

  @action async changeLanguage(language) {
    await this.account.changeLanguage(language);
  }
}
