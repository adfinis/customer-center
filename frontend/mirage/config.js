import { Response } from 'ember-cli-mirage'

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

  this.get('/vault/list', () => {
    return {
      values: {},
      children: {
        'dummy/': {
          values: {
            'foo.com': {
              path: 'secret/foo.com'
            },
            'bar.com': {
              path: 'secret/bar.com'
            }
          },
          children: {
            'baz.com': {
              values: {
                test1: {
                  path: 'secret/baz.com/test1'
                }
              },
              children: {
                test2: {
                  values: {
                    value1: {
                      path: 'secret/baz.com/test2/value1'
                    },
                    value2: {
                      path: 'secret/baz.com/test2/value2'
                    },
                    value3: {
                      path: 'secret/baz.com/test2/value3'
                    }
                  },
                  children: {}
                }
              }
            }
          }
        }
      }
    }
  })

  this.get('/vault/get/*path', () => {
    return {
      secret: {
        admin: '123qwe#secureashell??',
        test: '123qwe.notsecure',
        user: '123qwe'
      }
    }
  })

  this.delete('/proxy/vault/*path', () => {
    return new Response(204)
  })

  this.post('/proxy/vault/*path', (_, { requestBody }) => {
    return new Response(201, JSON.parse(requestBody))
  })

  // Sysupport

  this.get(
    '/proxy/sysupport/subscription-projects',
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
    '/proxy/sysupport/subscription-projects/:id',
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

  this.get('/proxy/sysupport/reports', 'timed-reports')

  this.get(
    '/proxy/sysupport/subscription-orders',
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
  this.post('/proxy/sysupport/subscription-orders', 'timed-subscription-orders')
  this.get(
    '/proxy/sysupport/subscription-orders/:id',
    'timed-subscription-orders'
  )
  this.delete(
    '/proxy/sysupport/subscription-orders/:id',
    'timed-subscription-orders'
  )
  this.post(
    '/proxy/sysupport/subscription-orders/:id/confirm',
    ({ timedSubscriptionOrders }, request) => {
      let order = timedSubscriptionOrders.find(request.params.id)
      order.update({ acknowledged: true })
      order.save()
      return order
    }
  )

  this.get(
    '/proxy/sysupport/subscription-packages',
    'timed-subscription-packages'
  )

  this.get('/proxy/sysupport/billing-types', 'timed-billing-types')
  this.get('/proxy/sysupport/billing-types/:id', 'timed-billing-types')
}
