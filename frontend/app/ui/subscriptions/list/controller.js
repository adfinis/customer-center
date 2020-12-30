import { A } from "@ember/array";
import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { formatDurationShort } from "customer-center/helpers/format-duration-short";
import { saveAs } from "file-saver";
import moment from "moment";

export default class SubscriptionsListController extends Controller {
  @service intl;

  @tracked projects;

  breadcrumbs = [
    { label: this.intl.t("page.subscriptions.title"), route: "subscriptions" },
    { label: this.intl.t("page.subscriptions.list.title") },
  ];

  @action search(key, query) {
    const normalized = query.trim().toLowerCase();

    this.projects =
      normalized.length > 0
        ? this._projects.filter((project) => {
            return project.get(key).toLowerCase().includes(normalized);
          })
        : this._projects;
  }

  @action sort(key, direction = "ASC") {
    this.projects.sortBy(key);

    if (direction === "DESC") {
      this.projects.reverseObjects();
    }
  }

  @action sortDuration(key, direction = "ASC") {
    this.projects = A(
      this.projects.toArray().sort((a, b) => {
        return direction === "ASC" ? a[key] - b[key] : b[key] - a[key];
      })
    );
  }

  @action applyFilter(event) {
    const { checked } = event.target;

    this.projects = checked
      ? this._projects.filterBy("isTimeAlmostConsumed")
      : this._projects;
  }

  @action export() {
    const headings = [
      this.intl.t("page.subscriptions.list.table.customer"),
      this.intl.t("page.subscriptions.list.table.project"),
      this.intl.t("page.subscriptions.list.table.billing"),
      this.intl.t("page.subscriptions.list.table.time-purchased"),
      this.intl.t("page.subscriptions.list.table.time-spent"),
      this.intl.t("page.subscriptions.list.table.time-total"),
      this.intl.t("page.subscriptions.list.table.time-unconfirmed"),
    ].join(",");

    const lines = this.projects
      .toArray()
      .map((project) => [
        project.get("customer.name"),
        project.get("name"),
        project.get("billingType.name"),
        formatDurationShort(project.get("purchasedTime")),
        formatDurationShort(project.get("spentTime")),
        formatDurationShort(project.get("totalTime")),
        formatDurationShort(project.get("unconfirmedTime")),
      ])
      .map((line) => line.join(","))
      .join("\n");

    const name = `cc-subscriptions-${moment().format("YYYY-MM-DD HH:mm")}.csv`;
    const blob = new Blob([`${headings}\n${lines}`], {
      type: "text/csv;charset=utf-8",
    });

    saveAs(blob, name);
  }

  setup(model, transition) {
    this.projects = model;
    this._projects = model;
  }
}
