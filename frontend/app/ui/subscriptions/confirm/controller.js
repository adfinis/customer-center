import Controller from "@ember/controller";
import { action } from "@ember/object";
import { alias } from "@ember/object/computed";
import { inject as service } from "@ember/service";

export default class SubscriptionsConfirmController extends Controller {
  @service intl;
  @service notify;
  @service timed;

  @alias("model") orders;

  breadcrumbs = [
    { label: this.intl.t("page.subscriptions.title"), route: "subscriptions" },
    { label: this.intl.t("page.subscriptions.confirm.title") },
  ];

  //     _        _   _
  //    / \   ___| |_(_) ___  _ __  ___
  //   / _ \ / __| __| |/ _ \| '_ \/ __|
  //  / ___ \ (__| |_| | (_) | | | \__ \
  // /_/   \_\___|\__|_|\___/|_| |_|___/
  //

  @action async accept(order) {
    const project = order.project.get("name");

    try {
      await this.timed.acceptSubscriptionOrder(order);

      this.notify.success(
        this.intl.t("page.subscriptions.confirm.accepted", { project })
      );
    } catch (error) {
      this.notify.fromError(error);
    }
  }

  @action async deny(order) {
    const project = order.project.get("name");

    try {
      await this.timed.denySubscriptionOrder(order);

      this.notify.success(
        this.intl.t("page.subscriptions.confirm.denied", { project })
      );
    } catch (error) {
      this.notify.fromError(error);
    }
  }
}
