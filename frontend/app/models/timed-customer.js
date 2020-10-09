import Model, { attr, hasMany } from "@ember-data/model";

export default class TimedCustomerModel extends Model {
  @attr("string") name;

  @hasMany("timed-subscription-project") projects;
}
