import ApplicationAdapter from "./application";

export default class TimedSubscriptionOrderAdapter extends ApplicationAdapter {
  namespace = "/api/proxy/timed";

  pathForType = () => "subscription-orders";
}
