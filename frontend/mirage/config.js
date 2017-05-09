export default function() {

  this.namespace = 'api' // make this `api`, for example, if your API is namespaced
  this.timing    = 500   // delay for each request, automatically set to 0 during testing

  this.post('/v1/login', function() {
    return {
      data: { token: '123qwe' }
    }
  })

  this.post('/v1/logout', function() { })

  this.get('/v1/user/current', function({ db }) {
    return {
      data: {
        user: db.users.find(1)
      }
    }
  })

  this.get('/proxy/project.adfinis-sygroup.ch/issues.json', function({ db }, req) {
    let { limit = 20, offset = 0 } = req.queryParams

    limit  = limit  | 0
    offset = offset | 0

    return {
      limit,
      offset,
      issues:      db.redmineIssues.slice(offset, offset + limit),
      total_count: db.redmineIssues.length
    }
  })

  this.get('/proxy/project.adfinis-sygroup.ch/projects.json', function({ db }, req) {
    let { limit = 20, offset = 0 } = req.queryParams

    limit  = limit  | 0
    offset = offset | 0

    return {
      limit,
      offset,
      issues:      db.redmineProjects.slice(offset, offset + limit),
      total_count: db.redmineProjects.length
    }
  })

  this.get('/rt/tickets', function({ db }, req) {
    let { limit = 20, offset = 0 } = req.queryParams

    limit  = limit  | 0
    offset = offset | 0

    return {
      data: {
        limit,
        offset,
        tickets: db.rtIssues.slice(offset, offset + limit),
        total:   db.rtIssues.length
      }
    }
  })

  this.get('/proxy/timescout/service/api.php', function({ db }, req) {
    let { action } = req.queryParams

    switch (action) {
      case 'projects':
        return db.timescoutProjects.toArray()
      case 'history':
        return db.timescoutHistories.toArray()
      case 'timesheet':
        let { limit = 20, page = 1, projectID } = req.queryParams

        limit     = limit     | 0
        page      = page      | 0
        projectID = projectID | 0

        let timesheets = db.timescoutTimesheets.where({ projectID })

        return {
          page,
          limit,
          total:            timesheets.length,
          timesheetEntries: timesheets.slice((page - 1) * limit, (page - 1) * limit + limit)
        }
      default:
        return {
          errors: [ {
            detail: 'Unknown timescout action'
          } ]
        }
    }
  })
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
