import Route from '@ember/routing/route'

export default Route.extend({
  model() {
    return this.store.query('subscription-order', {
      project: this.modelFor('sysupport.detail')
    })
  }
})
