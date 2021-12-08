import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default class ProtectedRoute extends Route.extend(
  AuthenticatedRouteMixin
) {
  @service session;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, "login");
  }
}
