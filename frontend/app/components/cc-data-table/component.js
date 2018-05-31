import Component from '@ember/component'
import { computed } from '@ember/object'

export default Component.extend({
  results: computed(
    'search.{attr,term}',
    'sort.{attr,order}',
    'model',
    function() {
      let results = this.get('model')
      let search = this.get('search')
      let sort = this.get('sort')

      if (search) {
        results = this._getFilter(search.attr, this._search)(results, search)
      }

      if (sort) {
        results = this._getFilter(sort.attr, this._sort)(results, sort)
      }

      return results
    }
  ),

  actions: {
    search(search) {
      this.set('search', search)
    },
    sort(sort) {
      this.set('sort', sort)
    }
  },

  /**
   *The default function which is used to filter records if there is no custom defined in the headers.
   *
   * @param {DS.RecordArray} model
   * @return {DS.RecordArray} Models filtered by current active filter
   * @author Jonas Cosandey (jonas.cosandey@adfinis-sygroup.ch)
   */
  _search(model, search) {
    return model.filter(model =>
      model
        .get(search.attr)
        .toLowerCase()
        .includes(search.term.trim().toLowerCase())
    )
  },

  _sort(model, sort) {
    if (sort.order === 'desc') {
      return model.sortBy(sort.attr)
    } else if (sort.order === 'asc') {
      return model.sortBy(sort.attr).reverse()
    }
  },

  _getFilter(attr, defaultFilter) {
    let header = this.get('headers').findBy('attr', attr)
    return header.hasOwnProperty('customFilter') && header.customFilter
      ? header.customFilter
      : defaultFilter
  }
})
