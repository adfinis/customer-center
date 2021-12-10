import { getOwner } from "@ember/application";
import { reads } from "@ember/object/computed";
import Service, { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class AccountService extends Service {
  @service session;
  @service store;
  @service notify;
  @service intl;
  @service moment;

  @tracked user;
  @reads("session.data.authenticated.access_token") accessToken;

  get language() {
    return this.intl.primaryLocale;
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
      const adapter = getOwner(this).lookup("adapter:application");
      const response = await fetch(
        `${adapter.host}/${adapter.namespace}/users/me`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );

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

  async changeLanguage(language) {
    this.intl.setLocale(language);
    this.moment.setLocale(language);
  }
}
