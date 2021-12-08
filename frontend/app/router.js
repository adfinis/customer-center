import EmberRouter from "@ember/routing/router";
import config from "customer-center/config/environment";

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

// eslint-disable-next-line array-callback-return
Router.map(function () {
  this.route("account", function () {
    this.route("login");
    this.route("password-confirm", { path: "/password-confirm/:token" });
  });

  this.route("subscriptions", function () {
    this.route("own");
    this.route("list");
    this.route("confirm");
    this.route("detail", { path: "/detail/:project_id" });
    this.route("reload", { path: "/reload/:project_id" });
  });

  this.route("notfound", { path: "/*path" });
});
