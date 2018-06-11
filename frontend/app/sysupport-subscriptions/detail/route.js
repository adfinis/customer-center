import Route from '@ember/routing/route'

export default Route.extend({
  model({ project_id: project }) {
    return this.store.findRecord('timed-subscription-project', project)
  },

  afterModel(project) {
    const breadCrumb = {
      title: project.get('name')
    }
    this.set('breadCrumb', breadCrumb)
  }
})
