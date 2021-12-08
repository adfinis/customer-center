import { inject as service } from "@ember/service";
import OIDCApplicationRouteMixin from "ember-simple-auth-oidc/mixins/oidc-application-route-mixin";

export default class ApplicationRoute extends OIDCApplicationRouteMixin {
  @service intl;
  @service moment;

  beforeModel() {
    super.beforeModel(...arguments);

    this.moment.setLocale("en");
    this.intl.setLocale("en");
  }
}
