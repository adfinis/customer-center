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

  //     _        _   _
  //    / \   ___| |_(_) ___  _ __  ___
  //   / _ \ / __| __| |/ _ \| '_ \/ __|
  //  / ___ \ (__| |_| | (_) | | | \__ \
  // /_/   \_\___|\__|_|\___/|_| |_|___/
  //

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
        if (direction === "ASC") {
          return a.get(key) - b.get(key);
        }
        return b.get(key) - a.get(key);
      })
    );
  }

  @action applyFilter(event) {
    const { checked } = event.target;

    this.projects = checked
      ? this._projects.filterBy("isTimeAlmostConsumed")
      : this._projects;
  }

  //  _     _  __                      _
  // | |   (_)/ _| ___  ___ _   _  ___| | ___
  // | |   | | |_ / _ \/ __| | | |/ __| |/ _ \
  // | |___| |  _|  __/ (__| |_| | (__| |  __/
  // |_____|_|_|  \___|\___|\__, |\___|_|\___|
  //                        |___/
  //

  setup(model, transition) {
    this.projects = model;
    this._projects = model;
  }
}
