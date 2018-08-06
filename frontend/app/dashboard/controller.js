import Controller from '@ember/controller'
import { computed } from '@ember/object'
import { inject as service } from '@ember/service'

export default Controller.extend({
  session: service(),

  init() {
    this._super(...arguments)
  },
  projects: computed('model.projects', function() {
    let projects = this.model.projects
      .toArray()
      .sort((a, b) => {
        return a.totalTime - b.totalTime
      })
      .slice(0, 2)

    projects.forEach(p => {
      p.set('percentage', this._getPercenage(p))
    })

    return projects
  }),

  _getPercenage(project) {
    return project.totalTime < 0 ? 0 : project.totalTime / project.purchasedTime
  }
})
