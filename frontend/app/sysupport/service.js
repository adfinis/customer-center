import Service, { inject as service } from '@ember/service'
import moment from 'moment'

export default Service.extend({
  ajax: service(),

  request(action, params, type = 'get') {
    let data = Object.assign({}, params, { action })
    return this.get('ajax').request('/api/proxy/sysupport/', {
      type,
      data
    })
  },

  async fetchTimesheets(projectID, page, limit) {
    let res = await this.request('timesheet', { projectID, page, limit })
    res.meta = { projectID: Number(projectID) }
    res.timesheetEntries = res.timesheetEntries.map(e => {
      e.date = moment(e.date, 'DD.MM.YYYY')
      return e
    })
    return res
  },

  fetchProjects() {
    return this.get('ajax').request(
      '/api/proxy/sysupport/subscription-projects'
    )
  },

  fetchPackages() {
    return this.get('ajax').request(
      '/api/proxy/sysupport/subscription-packages'
    )
  },

  fetchHistory() {
    return this.request('history')
  },
  fetchAbos(abotypeID) {
    return this.request('aboreload', { abotypeID })
  },
  sendTimeLoad(projectID, aboID) {
    return this.request('load', { projectID, aboID }, 'post')
  }
})
