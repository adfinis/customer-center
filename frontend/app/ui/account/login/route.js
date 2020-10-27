import BaseRoute from "customer-center/routes/-base";

export default class AccountLoginRoute extends BaseRoute {
  model() {
    return {
      username: "",
      password: "",
    };
  }
}
