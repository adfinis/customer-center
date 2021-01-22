import JSONAPIAdapter from "@ember-data/adapter/json-api";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service session;

  @computed("session.data.authenticated.token", "session.isAuthenticated")
  get headers() {
    const headers = {};

    if (this.session.isAuthenticated) {
      headers["X-Authorization"] = this.session.data.authenticated.token;
    }

    return headers;
  }

  handleResponse(status, headers, payload, requestData) {
    if (status === 401 && this.session.isAuthenticated) {
      this.session.invalidate();
    }

    return super.handleResponse(...arguments);
  }
}
