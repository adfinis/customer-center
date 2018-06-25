import Component from '@ember/component'

export default Component.extend({
  tagName: 'th',

  init() {
    this._super(...arguments)
    this._resetOrders()
  },

  _nextOrder() {
    let order = this.orders.shift()
    this.orders.push(order)
    return order
  },

  _resetOrders() {
    this.set('orders', ['desc', 'asc', 'none'])
  },

  actions: {
    sort() {
      let attr = this.attr,
        sort = this.sort
      if (sort) {
        if (sort.attr !== attr) {
          this._resetOrders()
          this.set('sort', { attr, order: 'desc' })
        } else {
          let order = this._nextOrder()
          if (order === 'none') {
            this.set('sort', null)
          } else {
            this.set('sort.order', order)
          }
        }
      } else {
        this.set('sort', { attr, order: this._nextOrder() })
      }
      this.onSort(this.sort)
    }
  }
})
