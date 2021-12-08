import Route from "@ember/routing/route";
import OIDCAuthenticationRouteMixin from "ember-simple-auth-oidc/mixins/oidc-authentication-route-mixin";

export default class LoginRoute extends Route.extend(
  OIDCAuthenticationRouteMixin
) {}
