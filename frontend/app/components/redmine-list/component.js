import Ember from 'ember'

const { $, computed, observer } = Ember

/**
 * Redmine list component
 *
 * @class RedmineList
 * @public
 */
export default Ember.Component.extend({
  limit:  10,
  offset:  0,
  total:   0,
  host:   '',
  sort:   'updated_on:desc',

  init(...args) {
    this._super(...args)
    this.send('updateModel')
  },

  page: computed('limit', 'offset', {
    get() {
      return Math.max(1, this.get('offset') / this.get('limit'))
    },
    set(key, value) {
      this.set('offset', this.get('limit') * (value - 1))

      return value
    }
  }),

  totalPages: computed('limit', 'total', function() {
    return Math.ceil(this.get('total') / this.get('limit'))
  }),

  showPager: computed('totalPages', function() {
    return this.get('totalPages') > 1
  }),

  updateModel: observer('host', 'limit', 'offset', 'sort', function() {
    this.send('updateModel')
  }),

  actions: {
    updateModel() {
      let params = {
        limit:  this.get('limit'),
        offset: this.get('offset'),
        sort:   this.get('sort')
      }

      this.set('error', null)

      $.getJSON(`/api/proxy/${this.get('host')}/issues.json`, params)
        .then(res => {
          this.set('issues', res.issues)
          this.set('total',  res.total_count)
        })
        .fail(xhr =>
          this.set('error', xhr.responseJSON || xhr.responseText)
        )
    }
  }
})
