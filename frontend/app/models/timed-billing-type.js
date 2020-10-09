import Model, { attr, hasMany } from "@ember-data/model";

export default class TimedBillingTypeModel extends Model {
  @attr("string") name;

  @hasMany("timed-subscription-project") projects;
  @hasMany("timed-subscription-package") packages;
}
