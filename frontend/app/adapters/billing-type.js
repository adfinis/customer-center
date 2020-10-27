import ApplicationAdapter from "./application";

export default class TimedBillingTypeAdapter extends ApplicationAdapter {
  namespace = "/api/proxy/timed";

  pathForType = () => "billing-types";
}
