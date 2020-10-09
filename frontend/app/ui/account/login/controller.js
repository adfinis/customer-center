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

  //     _        _   _
  //    / \   ___| |_(_) ___  _ __  ___
  //   / _ \ / __| __| |/ _ \| '_ \/ __|
  //  / ___ \ (__| |_| | (_) | | | \__ \
  // /_/   \_\___|\__|_|\___/|_| |_|___/
  //

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

  //  _     _  __                      _
  // | |   (_)/ _| ___  ___ _   _  ___| | ___
  // | |   | | |_ / _ \/ __| | | |/ __| |/ _ \
  // | |___| |  _|  __/ (__| |_| | (__| |  __/
  // |_____|_|_|  \___|\___|\__, |\___|_|\___|
  //                        |___/
  //

  setup(model, transition) {
    this.changeset = new Changeset(model);
  }

  reset(isExiting, transition) {
    this.changeset.rollback();
  }
}
