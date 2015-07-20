import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page', 'limit'],
  page: null,
  limit: 10,

  showPager: function() {
    return this.get('totalPages') > 1
  }.property('totalPages'),

  totalPages: function() {
    let timesheet = this.get('model')
    return Math.ceil(timesheet.total / this.get('limit'))
  }.property('model.total', 'limit')
});
