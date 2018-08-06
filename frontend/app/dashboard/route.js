import Route from '@ember/routing/route'
import { hash } from 'rsvp'

export default Route.extend({
  model() {
    return hash({
      projects: this.store.findAll('timed-subscription-project'),
      tickets: this.store.query('rt-ticket', {
        statistics: true,
        page_size: 3,
        page: 1
      })
    })
  }
})
