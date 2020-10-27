import { inject as service } from "@ember/service";
import BaseRoute from "customer-center/routes/-base";
import moment from "moment";

export default class ApplicationRoute extends BaseRoute {
  @service intl;
  @service moment;

  beforeModel() {
    super.beforeModel(...arguments);

    this.moment.setLocale("en");
    this.intl.setLocale("en");
  }
}
