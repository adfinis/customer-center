import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default class IndexController extends Controller {
  @service intl;

  get projects() {
    return this.model.projects;
  }

  get locations() {
    return this.model.locations;
  }

  get support() {
    return this.model.support;
  }

  get profiles() {
    return this.model.profiles;
  }

  breadcrumbs = [{ label: this.intl.t("page.index.title") }];
}
