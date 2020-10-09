import Model, { attr, hasMany, belongsTo } from "@ember-data/model";
import ENV from "customer-center/config/environment";
import moment from "moment";

export default class TimedSubscriptionProjectModel extends Model {
  @attr("string") name;
  @attr("django-duration") purchasedTime;
  @attr("django-duration") spentTime;

  @hasMany("timed-subscription-order") orders;
  @belongsTo("timed-billing-type") billingType;
  @belongsTo("timed-customer") customer;

  get totalTime() {
    return moment.duration(this.purchasedTime - this.spentTime);
  }

  get unconfirmedTime() {
    return this.orders
      .filter((order) => order !== null)
      .filter((order) => !order.get("acknowledged"))
      .reduce(
        (accumulator, order) => accumulator.add(order.get("duration")),
        moment.duration()
      );
  }

  get isTimeAlmostConsumed() {
    return this.totalTime.asHours() <= ENV.APP.alertTime;
  }

  get percentage() {
    return this.totalTime < 0 ? 0 : this.totalTime / this.purchasedTime;
  }

  /** This value is used to create the correct CSS classes. */
  get percentageGroup() {
    return this.percentage.toFixed(1) * 10;
  }
}
