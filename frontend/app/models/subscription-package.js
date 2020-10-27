import Model, { attr, belongsTo } from "@ember-data/model";

export default class TimedSubscriptionPackageModel extends Model {
  @attr("django-duration") duration;
  @attr("string") price;

  @belongsTo("billing-type") billingType;
}
