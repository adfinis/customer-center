export default function() {
  //code coverage
  this.passthrough('/write-coverage')

  this.namespace = '/api'
  this.timing = 400

  this.post('/v1/login', (sch, request) =>
    JSON.stringify({
      data: { token: JSON.parse(request.requestBody).username }
    })
  )

  this.post('/v1/logout', () => {})

  this.get('/v1/users/current', ({ users }, request) => {
    let user = users.findBy({
      username: request.requestHeaders['X-Authorization']
    })
    if (!user) {
      user = users.find(1)
    }
    return user
  })

  this.put('/v1/users/current', function({ users }, request) {
    return users.findBy({ username: request.requestHeaders['X-Authorization'] })
  })

  // timed

  this.get(
    '/proxy/timed/subscription-projects',
    ({ timedSubscriptionProjects }, request) => {
      if (request.queryParams.include) {
        let includes = request.queryParams.include.split(',')
        let index = includes.indexOf('billing_type')
        if (index > -1) {
          includes.splice(index, 1, 'billing-type')
          request.queryParams.include = includes.join()
        }
      }
      return timedSubscriptionProjects.all()
    }
  )

  this.get(
    '/proxy/timed/subscription-projects/:id',
    ({ timedSubscriptionProjects }, request) => {
      if (request.queryParams.include) {
        let includes = request.queryParams.include.split(',')
        let index = includes.indexOf('billing_type')
        if (index > -1) {
          includes.splice(index, 1, 'billing-type')
          request.queryParams.include = includes.join()
        }
      }
      return timedSubscriptionProjects.find(request.params.id)
    }
  )

  this.get('/proxy/timed/reports', 'timed-reports')

  this.get(
    '/proxy/timed/subscription-orders',
    ({ timedSubscriptionOrders }, request) => {
      let blacklist = ['ordering', 'include', 'project']
      let queryParams = JSON.parse(JSON.stringify(request.queryParams))

      blacklist.forEach(param => {
        if (queryParams.hasOwnProperty(param)) {
          delete queryParams[param]
        }
      })

      if (typeof queryParams.acknowledged !== 'undefined') {
        /*
        request.queryParams.acknowledged is either 0 or 1 so we
        have to assign true or false to acknowledged because as
        query params, 0 and 1 are actually numbers and not parsed to booleans.
         */
        queryParams.acknowledged = queryParams.acknowledged == true
      }
      if (typeof request.queryParams.project !== 'undefined') {
        queryParams.projectId = request.queryParams.project
      }
      return timedSubscriptionOrders.where(queryParams)
    }
  )
  this.post('/proxy/timed/subscription-orders', 'timed-subscription-orders')
  this.get('/proxy/timed/subscription-orders/:id', 'timed-subscription-orders')
  this.delete(
    '/proxy/timed/subscription-orders/:id',
    'timed-subscription-orders'
  )
  this.post(
    '/proxy/timed/subscription-orders/:id/confirm',
    ({ timedSubscriptionOrders }, request) => {
      let order = timedSubscriptionOrders.find(request.params.id)
      order.update({ acknowledged: true })
      order.save()
      return order
    }
  )

  this.get('/proxy/timed/subscription-packages', 'timed-subscription-packages')

  this.get('/proxy/timed/billing-types', 'timed-billing-types')
  this.get('/proxy/timed/billing-types/:id', 'timed-billing-types')
}
