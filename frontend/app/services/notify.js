import parseError from "customer-center/utils/parse-error";
import NotifyService from "ember-notify";

export default class ExtrendedNotifyService extends NotifyService {
  closeAfter = 5000;

  fromError(error) {
    this.error(parseError(error));
  }
}
