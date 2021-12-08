import Controller from "@ember/controller";
import { alias } from "@ember/object/computed";
import { inject as service } from "@ember/service";

export default class IndexController extends Controller {
  @service intl;

  @alias("model.projects") projects;
  @alias("model.locations") locations;
  @alias("model.support") support;
  @alias("model.profiles") profiles;

  breadcrumbs = [{ label: this.intl.t("page.index.title") }];
}
