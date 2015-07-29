import Ember from 'ember'
import ajax  from 'ic-ajax'

export default Ember.Route.extend({
  queryParams: {
    page: {
      refreshModel: true
    },
    limit: {
      refreshModel: true
    }
  },

  setupController(controller, model) {
    let project = this.modelFor('timescout').find(p =>
      p.id === model.meta.projectID
    )

    controller.set('project', project)
    controller.set('model',   model)
  },

  async model({ id, limit, page }) {
    let params = {
      action:    'timesheet',
      projectID: Number(id),
      page,
      limit
    }

    let res = await ajax('/api/proxy/timescout/service/api.php', { data: params })
    res.meta = { projectID: params.projectID }
    return res
  }
})
