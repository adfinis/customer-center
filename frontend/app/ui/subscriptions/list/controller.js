import { A } from "@ember/array";
import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

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
            return project[key].toLowerCase().includes(normalized);
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

  setup(model, transition) {
    this.projects = model;
    this._projects = model;
  }
}
