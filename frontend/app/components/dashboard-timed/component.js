import Component from '@ember/component'
import { task } from 'ember-concurrency'
import { computed } from '@ember/object'
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

  projects: computed(
    'fetchProjects{isRunning,lastSuccessful.value}',
    function() {
      if (this.fetchProjects.lastSuccessful) {
        let projects = this.fetchProjects.lastSuccessful.value
          .toArray()
          .sort((a, b) => {
            return a.totalTime - b.totalTime
          })
          .slice(0, 2)

        projects.forEach(p => {
          p.set('percentage', this._getPercentage(p))
        })

        return projects
      }
      return {}
    }
  ),

  _getPercentage(project) {
    return project.totalTime < 0 ? 0 : project.totalTime / project.purchasedTime
  }
})
