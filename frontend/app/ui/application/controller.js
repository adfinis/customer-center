import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import moment from "moment";

export default class ApplicationController extends Controller {
  @service account;
  @service session;
  @service moment;
  @service intl;

  get languages() {
    return this.intl.locales.map((locale) => ({
      key: locale,
      label: locale.toUpperCase(),
    }));
  }

  @action async changeLanguage(language) {
    this.intl.setLocale(language);
    this.moment.setLocale(language);

    await this.account.changeLanguage(language);
  }
}
