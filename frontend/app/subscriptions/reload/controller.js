import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { isEmpty } from "@ember/utils";
import { tracked } from "@glimmer/tracking";
import ENV from "customer-center/config/environment";
import { Changeset } from "ember-changeset";
import moment from "moment";
import UIkit from "uikit";

export default class SubscriptionsReloadController extends Controller {
  @service account;
  @service notify;
  @service intl;
  @service timed;

  @tracked project;
  @tracked packages;
  @tracked changeset;

  get showForm() {
    return this.account.isInGroup(ENV.auth.adminRole);
  }

  get showPackages() {
    return this.account.isInGroup(ENV.auth.customerRole);
  }

  get breadcrumbs() {
    return [
      {
        label: this.intl.t("page.subscriptions.title"),
        route: "subscriptions",
      },
      {
        label: this.project.name,
        route: "subscriptions.detail",
        model: this.project.id,
      },
      { label: this.intl.t("page.subscriptions.reload.title") },
    ];
  }

  @action async charge(event) {
    event.preventDefault();

    this.changeset.execute();

    const { hours = 0, minutes = 0, date } = this.changeset.data;

    try {
      // Creating a duration with a float as hours cannot be combined with
      // minutes. Moment seems to add up correctly but says that it is invalid.
      const duration = moment.duration({ hours });
      duration.add(minutes, "minutes");

      const ordered = isEmpty(date) ? undefined : moment(date);

      await this.timed.placeSubscriptionOrder(this.project, duration, ordered);

      this.notify.success(
        this.intl.t("page.subscriptions.reload.form.success")
      );

      this.transitionToRoute("subscriptions.detail", this.project.id);
    } catch (error) {
      this.notify.fromError(error);
    }
  }

  @action async order(choice) {
    try {
      const duration = choice.duration;

      try {
        await UIkit.modal.confirm(
          this.intl.t("page.subscriptions.reload.packages.confirm", {
            hours: duration.asHours(),
          })
        );
      } catch (error) {
        return;
      }

      await this.timed.placeSubscriptionOrder(this.project, duration);

      this.notify.success(
        this.intl.t("page.subscriptions.reload.packages.success")
      );

      this.transitionToRoute("subscriptions.detail", this.project.id);
    } catch (error) {
      this.notify.fromError(error);
    }
  }

  setup(model, transition) {
    this.project = model.project;
    this.packages = model.packages;

    this.changeset = new Changeset({
      hours: 0,
      minutes: 0,
      date: "",
    });
  }
}
