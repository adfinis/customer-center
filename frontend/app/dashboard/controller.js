import Controller from '@ember/controller'
import { computed } from '@ember/object'
import { inject as service } from '@ember/service'

export default Controller.extend({
  session: service(),

  init() {
    this._super(...arguments)
  },
  projects: computed('model.projects', function() {
    return this.model.projects
      .toArray()
      .sort((a, b) => {
        return this._getPercenage(a) > this._getPercenage(b)
      })
      .slice(0, 2)
      .map(p => {
        p.set('percentage', this._getPercenage(p))
        return p
      })
  }),

  _getPercenage(project) {
    return project.totalTime < 0 ? 0 : project.totalTime / project.purchasedTime
  }
})
