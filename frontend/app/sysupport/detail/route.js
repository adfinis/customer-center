import Route from '@ember/routing/route'
import { hash } from 'rsvp'

export default Route.extend({
  model({ project_id: project }) {
    return hash({
      reports: this.store.query('timed-report', { project, include: 'user' }),
      orders: this.store.query('timed-subscription-order', { project })
    })
  }
})
