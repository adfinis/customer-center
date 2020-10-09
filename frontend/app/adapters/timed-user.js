import ApplicationAdapter from "./application";

export default class TimedUserAdapter extends ApplicationAdapter {
  namespace = "/api/proxy/timed";

  pathForType = () => "users";
}
