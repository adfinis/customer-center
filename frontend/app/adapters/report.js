import ApplicationAdapter from "./application";

export default class TimedReportAdapter extends ApplicationAdapter {
  namespace = "/api/proxy/timed";

  pathForType = () => "reports";
}
