import Route from '@ember/routing/route'
import { computed } from '@ember/object'

export default Route.extend({
  breadCrumb: computed('controller.model.project.name', function() {
    return { title: this.get('controller.model.project.name') }
  }),

  model({ project }) {
    return this.store.findRecord('timed-subscription-project', project)
  }
})
