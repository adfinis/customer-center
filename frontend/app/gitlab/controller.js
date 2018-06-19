import Controller from '@ember/controller'
import { computed } from '@ember/object'
import { inject as service } from '@ember/service'
import moment from 'moment'

export default Controller.extend({
  i18n: service(),

  /**
   * Initialize the `selectio` attribute and the `date` attribute.
   *
   * @author Jonas Cosandey (jonas.cosandey@adfinis-sygroup.ch)
   */
  init() {
    this._super(...arguments)
    this.set('selection', null)
    this.set('date', moment().subtract(2, 'weeks'))
  },

  /**
   * Return a filter object consisting of `search` and `date`.
   *
   * @returns {Object} Filter Object
   * @author Jonas Cosandey (jonas.cosandey@adfinis-sygroup.ch)
   */
  filter: computed('search', 'date', function() {
    return {
      search: this.search,
      date: this.date
    }
  }),

  /**
   * Get groups. If there is a `filter` defined, only return the filtered groups.
   *
   * @returns {Object[]} Returns the filtered groups
   * @author Jonas Cosandey (jonas.cosandey@adfinis-sygroup.ch)
   */
  groups: computed('model', 'selection', function() {
    if (!this.selection) {
      return this.model
    }
    return [this.model.find(group => group.id == this.selection)]
  })
})
