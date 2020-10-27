import Model, { attr, hasMany } from "@ember-data/model";

export default class TimedUserModel extends Model {
  @attr firstName;
  @attr lastName;
  @attr shortname;

  /** Returns the first and/or last name. */
  get fullName() {
    return [this.firstName, this.lastName].filter(Boolean).join(" ");
  }

  @attr language;
  @attr email;

  @hasMany("reports") reports;

  /** The groups are an array of strings. */
  @attr groups;
}
