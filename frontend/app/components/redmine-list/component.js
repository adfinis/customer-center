import Ember from 'ember'

const { $ } = Ember

export default Ember.Component.extend({
  limit:  10,
  offset:  0,
  sort:   'updated_on:desc',

  page: Ember.computed('limit', 'offset', {
    get() {
      return Math.max(1, this.get('offset') / this.get('limit'))
    },
    set(key, value) {
      this.set('offset', this.get('limit') * (value - 1))

      return value
    }
  }),

  totalPages: Ember.computed('limit', 'model.total_count', function() {
    return Math.ceil(this.get('model.total_count') / this.get('limit'))
  }),

  showPager: Ember.computed('totalPages', function() {
    return this.get('totalPages') > 1
  }),

  model: null,

  updateModel: Ember.observer('host', 'limit', 'offset', 'sort', function() {
    let params = {
      limit:  this.get('limit'),
      offset: this.get('offset'),
      sort:   this.get('sort')
    }

    this.set('error', null)

    $.getJSON(`/api/proxy/${this.get('host')}/issues.json`, params)
      .then(res =>
        this.set('model', res)
      )
      .fail(xhr =>
        this.set('error', xhr.responseText)
      )
  })
})
