import BaseRoute from "customer-center/routes/-base";

export default class AccountPasswordResetRoute extends BaseRoute {
  model() {
    return {
      username: "",
    };
  }
}
