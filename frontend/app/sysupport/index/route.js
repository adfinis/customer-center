import Route from '@ember/routing/route'

export default Route.extend({
  model() {
    this.set('breadCrumb', { title: 'Overview' })
    return this.store.query('timed-subscription-project', { ordering: 'name' })
  }
})
