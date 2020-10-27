import Model, { attr, hasMany } from "@ember-data/model";

export default class TimedUserModel extends Model {
  @attr("string") firstName;
  @attr("string") lastName;
  @attr("string") shortname;

  /** Returns the first and/or last name. */
  get fullName() {
    return [this.firstName, this.lastName].filter(Boolean).join(" ");
  }

  @attr("string") language;
  @attr("string") email;

  @hasMany("reports") reports;

  /** The groups are an array of strings. */
  @attr() groups;
}
