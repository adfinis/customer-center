import Controller from '@ember/controller'

export default Controller.extend({
  init() {
    this._super(...arguments)
    this.set('headers', [
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
        title: 'sysupport.admin.orderedTime',
        attr: 'purchasedTime',
        customFilter: this._sortDurations
      },
      {
        type: 'sort',
        title: 'sysupport.admin.usedTime',
        attr: 'spentTime',
        customFilter: this._sortDurations
      },
      {
        type: 'sort',
        title: 'sysupport.admin.timeTotal',
        attr: 'totalTime',
        customFilter: this._sortDurations
      },
      {
        type: 'sort',
        title: 'sysupport.admin.unconfirmedTime',
        attr: 'unconfirmedTime',
        customFilter: this._sortDurations
      }
    ])
  },

  _sortDurations(data, { order, attr }) {
    return data.toArray().sort((a, b) => {
      if (order === 'asc') {
        return a
          .get(attr)
          .clone()
          .subtract(b.get(attr))
          .asMinutes()
      } else if (order === 'desc') {
        return b
          .get(attr)
          .clone()
          .subtract(a.get(attr))
          .asMinutes()
      }
    })
  }
})
