import Route from '@ember/routing/route'

export default Route.extend({
  model({ project_id: id }) {
    return id
  }
})
