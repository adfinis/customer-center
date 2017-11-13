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
      search: this.get('search'),
      date: this.get('date')
    }
  }),

  /**
   * Get groups. If there is a `filter` defined, only return the filtered groups.
   *
   * @returns {Object[]} Returns the filtered groups
   * @author Jonas Cosandey (jonas.cosandey@adfinis-sygroup.ch)
   */
  groups: computed('model', 'selection', function() {
    if (!this.get('selection')) {
      return this.get('model')
    } else {
      return [
        this.get('model').find(group => group.id == this.get('selection.id'))
      ]
    }
  })
})
