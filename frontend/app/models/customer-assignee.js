import Model, { attr, belongsTo } from "@ember-data/model";

export default class CustomerAssigneeModel extends Model {
  @attr("boolean") isReviewer;
  @attr("boolean") isManager;
  @attr("boolean") isResource;
  @attr("boolean") isCustomer;

  @belongsTo("customer") customer;
  @belongsTo("user") user;
}
