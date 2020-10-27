import ApplicationAdapter from "./application";

export default class TimedSubscriptionProjectAdapter extends ApplicationAdapter {
  namespace = "/api/proxy/timed";

  pathForType = () => "subscription-projects";
}
