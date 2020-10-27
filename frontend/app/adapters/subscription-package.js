import ApplicationAdapter from "./application";

export default class TimedSubscriptionPackageAdapter extends ApplicationAdapter {
  namespace = "/api/proxy/timed";

  pathForType = () => "subscription-packages";
}
