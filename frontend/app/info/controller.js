import Controller from "@ember/controller";

export default class InfoController extends Controller {
  get support() {
    return this.model.support;
  }

  get profiles() {
    return this.model.profiles;
  }
}
