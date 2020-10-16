import { later } from "@ember/runloop";
import { inject as service } from "@ember/service";
import { isEmpty } from "@ember/utils";
import Base from "ember-simple-auth/authenticators/base";

export default class CustomAuthenticator extends Base {
  @service account;

  async restore(session) {
    if (isEmpty(session.token)) {
      throw new Error("No token to restore found");
    }

    // We execute the fetch later as it needs the session we restore here.
    later(() => this.account.fetchCurrentUser());

    return session;
  }

  async authenticate(username, password) {
    const headers = {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/json",
    };

    const response_login = await fetch("/api/v1/login", {
      method: "POST",
      credentials: "same-origin",
      headers,
      body: JSON.stringify({ username, password }),
    });

    const json_login = await response_login.json();

    if (!response_login.ok) {
      const {
        errors: [{ detail }],
      } = json_login;
      throw new Error(detail);
    }

    const { token } = json_login.data;

    // We execute the fetch later as it needs the session we create here.
    later(() => this.account.fetchCurrentUser());

    return { token };
  }

  invalidate(session) {
    return fetch("/api/v1/logout", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "X-Authorization": session.token,
      },
    });
  }
}
