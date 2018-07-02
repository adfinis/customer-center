import Controller from '@ember/controller'
import { computed } from '@ember/object'

export default Controller.extend({
  headers: computed(function() {
    return [
      {
        type: 'search',
        title: 'sysupport.admin.project',
        attr: 'name'
      },
      {
        type: 'search',
        title: 'sysupport.admin.customer',
        attr: 'customer.name'
      },
      {
        type: 'search',
        title: 'sysupport.admin.billingType',
        attr: 'billingType.name'
      },
      {
        type: 'sort',
        title: 'sysupport.time.ordered',
        attr: 'purchasedTime',
        customFilter: this._sortDurations
      },
      {
        type: 'sort',
        title: 'sysupport.time.used',
        attr: 'spentTime',
        customFilter: this._sortDurations
      },
      {
        type: 'sort',
        title: 'sysupport.time.total',
        attr: 'totalTime',
        customFilter: this._sortDurations
      },
      {
        type: 'sort',
        title: 'sysupport.time.unconfirmed',
        attr: 'unconfirmedTime',
        customFilter: this._sortDurations
      }
    ]
  }),

  _sortDurations(data, { order, attr }) {
    return data.toArray().sort((a, b) => {
      if (order === 'asc') {
        return a.get(attr) - b.get(attr)
      } else if (order === 'desc') {
        return b.get(attr) - a.get(attr)
      }
    })
  }
})
