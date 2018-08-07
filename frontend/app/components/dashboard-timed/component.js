import Component from '@ember/component'
import { task } from 'ember-concurrency'
import { inject as service } from '@ember/service'

export default Component.extend({
  store: service(),

  init() {
    this._super(...arguments)
    this.fetchProjects.perform()
  },

  fetchProjects: task(function*() {
    let projects = yield this.store.findAll('timed-subscription-project')

    projects = projects
      .toArray()
      .sort((a, b) => {
        return a.totalTime - b.totalTime
      })
      .slice(0, 2)

    projects.forEach(p => {
      p.set('percentage', this._getPercentage(p))
    })

    return projects
  }),

  _getPercentage(project) {
    return project.totalTime < 0 ? 0 : project.totalTime / project.purchasedTime
  }
})
