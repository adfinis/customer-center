import Ember from 'ember'

/**
 * Redmine Service for fetching data from a redmine instance
 *
 * @class RedmineService
 * @public
 */
export default Ember.Service.extend({
  ajax: Ember.inject.service(),

  /**
   * Fetch redmine issues from a host
   *
   * @param {Object} params Query params to filter issues
   * @return {Object}
   */
  async fetchIssues(params) {
    let res = await this.get('ajax').request('/api/proxy/redmine/issues.json', {
      data: params
    })

    return {
      issues: res.issues,
      total: res.total_count,
      offset: res.offset,
      limit: res.limit
    }
  },

  /**
   * Fetch redmine projects from a redmine host
   *
   * @param {Object} params Query params to filter projects
   * @return {Object}
   */
  async fetchProjects(params) {
    let res = await this.get(
      'ajax'
    ).request('/api/proxy/redmine/projects.json', { data: params })

    return {
      projects: res.projects,
      total: res.total_count,
      offset: res.offset,
      limit: res.limit
    }
  }
})
