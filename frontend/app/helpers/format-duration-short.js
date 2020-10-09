import { helper } from "@ember/component/helper";
import startPaddingTag from "customer-center/utils/start-padding-tag";
import moment from "moment";

export function formatDurationShort(params) {
  let [duration] = params;

  //remove "-" from negative numbers
  const negative = duration < 0;

  duration = moment.duration(Math.abs(duration));

  const str = startPaddingTag(2)`${Math.trunc(
    duration.asHours()
  )}:${duration.minutes()}`;

  return negative ? `-${str}` : str;
}

export default helper(formatDurationShort);
