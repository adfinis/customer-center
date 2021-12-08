import Route from "@ember/routing/route";

export default class AccountIndexRoute extends Route {
  beforeModel() {
    // As there is currently no account overview page
    // we direct to the application index (home) route.
    this.transitionTo("index");
  }
}
