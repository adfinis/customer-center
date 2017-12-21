import Route from '@ember/routing/route'
import { hash } from 'rsvp'

export default Route.extend({
  model() {
    let project = this.modelFor('sysupport.detail').id
    return hash({
      reports: this.store.query('timed-report', {
        project,
        include: 'user',
        ordering: '-date'
      }),
      orders: this.store.query('timed-subscription-order', { project })
    })
  }
})
