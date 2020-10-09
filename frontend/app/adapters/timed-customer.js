import ApplicationAdapter from "./application";

export default class TimedCustomerAdapter extends ApplicationAdapter {
  namespace = "/api/proxy/timed";

  pathForType = () => "customers";
}
