import Route from '@ember/routing/route'

export default Route.extend({
  model() {
    return this.store.query('report', {
      project: this.modelFor('sysupport.detail'),
      include: 'user'
    })
  }
})
