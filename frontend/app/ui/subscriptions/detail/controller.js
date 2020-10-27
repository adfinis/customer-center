import Controller from "@ember/controller";
import { action, get } from "@ember/object";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { task } from "ember-concurrency-decorators";

export default class SubscriptionsDetailController extends Controller {
  @service account;
  @service intl;
  @service timed;

  @tracked project;
  @tracked orders;
  @tracked reports;
  @tracked reportsPage;
  @tracked reportsNext;

  breadcrumbs = [
    { label: this.intl.t("page.subscriptions.title"), route: "subscriptions" },
    { label: this.intl.t("page.subscriptions.detail.title") },
  ];

  @task *fetchNextReports() {
    try {
      const reports = yield this.timed.getProjectReports(this.reportsPage++);
      this.reports.pushObjects(reports.toArray());

      this.reportsNext = get(reports, "links.next");
    } catch (error) {
      console.error(error);
      this.reportsNext = false;
    }
  }

  setup(model, transition) {
    this.project = model.project;
    this.orders = model.orders;

    this.reports = model.reports.toArray();
    this.reportsPage = 1;
    this.reportsNext = Boolean(get(model, "reports.links.next"));
  }
}
