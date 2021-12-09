import { reads } from "@ember/object/computed";
import Service, { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class AccountService extends Service {
  @service session;
  @service store;
  @service notify;
  @service intl;

  @tracked user;
  @reads("session.data.authenticated.access_token") accessToken;

  get language() {
    return "de";
  }

  get groups() {
    return this.session.data.authenticated?.userinfo.groups ?? [];
  }

  isInGroup(group) {
    return this.groups.includes(group);
  }

  isInGroups(amount, groups) {
    const method = amount === "one" ? "some" : "every";
    return this.groups[method]((group) => groups.includes(group));
  }

  async fetchCurrentUser() {
    try {
      const response = await fetch("/api/v1/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      const json = await response.json();
      const { id } = json.data;

      // We push the reponse through the store
      // to deserialize the JSON:API payload.
      this.store.pushPayload("user", json);
      // We must use peek here as the endpoint doesn't exist.
      this.user = this.store.peekRecord("user", id);

      this.session.data.user = this.user;
    } catch (error) {
      console.error(error);
      this.notify.fromError(error);
    }
  }
}
