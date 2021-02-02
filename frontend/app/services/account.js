import Service, { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import ENV from "customer-center/config/environment";
import moment from "moment";

export default class AccountService extends Service {
  @service session;
  @service store;
  @service notify;
  @service moment;
  @service intl;

  @tracked info;

  get language() {
    return this.info ? this.info.get("language") : "en";
  }

  get groups() {
    return (this.info && this.info.groups) || [];
  }

  isInGroup(group) {
    return this.groups.includes(group);
  }

  isInGroups(amount, groups) {
    const method = amount === "one" ? "some" : "every";
    return this.groups[method]((group) => groups.includes(group));
  }

  async fetchCurrentUser() {
    const { token } = this.session.data.authenticated;

    try {
      const response = await fetch("/api/v1/users/current", {
        method: "GET",
        credentials: "same-origin",
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/json",
          "X-Authorization": token,
        },
      });

      const json = await response.json();
      const { id } = json.data;

      // We push the reponse through the store
      // to deserialize the JSON:API payload.
      this.store.pushPayload("user", json);
      // We must use peek here as the endpoint doesn't exist.
      this.info = this.store.peekRecord("user", id);

      const { language } = this.info;

      if (language) {
        this.intl.setLocale(language);
        this.moment.setLocale(language);
      }
    } catch (error) {
      console.error(error);
      this.notify.fromError(error);
    }
  }

  async changeLanguage(language) {
    this.intl.setLocale(language);
    this.moment.setLocale(language);

    if (this.info) {
      this.info.set("language", language);
    }

    const { token } = this.session.data.authenticated;

    await fetch("/api/v1/users/current", {
      method: "PUT",
      credentials: "same-origin",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify(this.info.serialize()),
    });
  }
}
