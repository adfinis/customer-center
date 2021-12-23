import Controller from "@ember/controller";
import { get } from "@ember/object";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import ENV from "customer-center/config/environment";
import { task } from "ember-concurrency";

export default class SubscriptionsDetailController extends Controller {
  @service account;
  @service intl;
  @service timed;

  @tracked project;
  @tracked orders;
  @tracked ordersNext;
  @tracked reports;
  @tracked reportsNext;

  get showReloadButton() {
    return this.account.isInGroups("one", [
      ENV.auth.adminRole,
      ENV.auth.customerRole,
    ]);
  }

  get breadcrumbs() {
    return [
      {
        label: this.intl.t("page.subscriptions.title"),
        route: "subscriptions",
      },
      { label: this.project.name },
    ];
  }

  @task *fetchNextReports() {
    try {
      this.reportsPage++;
      const reports = yield this.timed.getProjectReports(
        this.project.id,
        this.reportsPage
      );
      this.reports.pushObjects(reports.toArray());

      this.reportsNext = Boolean(get(reports, "links.next"));
    } catch (error) {
      console.error(error);
      this.reportsNext = false;
    }
  }

  @task *fetchNextOrders() {
    try {
      this.ordersPage++;
      const orders = yield this.timed.getProjectOrders(
        this.project.id,
        this.ordersPage
      );
      this.orders.pushObjects(orders.toArray());

      this.ordersNext = Boolean(get(orders, "links.next"));
    } catch (error) {
      console.error(error);
      this.ordersNext = false;
    }
  }

  setup(model, transition) {
    this.project = model.project;

    this.reports = model.reports.toArray();
    this.reportsPage = 1;
    this.reportsNext = Boolean(get(model, "reports.links.next"));

    this.orders = model.orders.toArray();
    this.ordersPage = 1;
    this.ordersNext = Boolean(get(model, "orders.links.next"));
  }
}
