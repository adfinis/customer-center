import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'
import { computed } from '@ember/object'

export default Route.extend({
  i18n: service(),

  breadCrumb: computed('controller.project.name', function() {
    return { title: this.get('controller.project.name') }
  }),

  model({ project: projectId }) {
    return projectId
  },

  setupController(controller) {
    this._super(...arguments)
    controller.set('reportsPage', 1)
    controller.set('reportsNext', false)
    controller.set('reports', [])
    controller.fetchModels.perform()
  }
})
