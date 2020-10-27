import Model, { attr, hasMany, belongsTo } from "@ember-data/model";
import ENV from "customer-center/config/environment";
import moment from "moment";

export default class TimedSubscriptionProjectModel extends Model {
  @attr("string") name;
  @attr("django-duration") purchasedTime;
  @attr("django-duration") spentTime;

  @hasMany("subscription-order") orders;
  @belongsTo("billing-type") billingType;
  @belongsTo("customer") customer;

  get totalTime() {
    return moment.duration(this.purchasedTime - this.spentTime);
  }

  get unconfirmedTime() {
    return this.orders
      .filter((order) => order !== null)
      .filter((order) => !order.acknowledged)
      .reduce(
        (accumulator, order) => accumulator.add(order.duration),
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
