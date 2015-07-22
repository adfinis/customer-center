import Ember from 'ember';

const { $ } = Ember

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
    let project = this.modelFor('timescout').find(project => project.id == model.meta.projectID)

    controller.set('project', project)
    controller.set('model',   model)
  },

  model({ id, limit, page }) {
    let params = {
      action: 'timesheet',
      projectID: id,
      page,
      limit
    }

    return $.getJSON('/api/proxy/timescout/service/api.php', params)
      .then(function(res){
        res.meta = {projectID: id}
        return res
      })
  }
});
