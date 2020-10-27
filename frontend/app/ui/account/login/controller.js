import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { Changeset } from "ember-changeset";

export default class AccountLoginController extends Controller {
  @service session;
  @service notify;
  @service intl;

  @tracked changeset;

  breadcrumbs = [
    { label: this.intl.t("page.account.title"), route: "account" },
    { label: this.intl.t("page.account.login.title") },
  ];

  @action cancel(event) {
    this.transitionToRoute("index");
  }

  @action async submit(event) {
    event.preventDefault();

    this.changeset.execute();

    const { username, password } = this.changeset.data;

    try {
      await this.session.authenticate(
        "authenticator:custom",
        username,
        password
      );

      this.notify.success(this.intl.t("page.account.login.success"));
    } catch (error) {
      this.notify.fromError(error);
    }
  }

  setup(model, transition) {
    this.changeset = new Changeset(model);
  }

  reset(isExiting, transition) {
    this.changeset.rollback();
  }
}
