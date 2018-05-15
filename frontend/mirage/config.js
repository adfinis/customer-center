import { Response } from 'ember-cli-mirage'

export default function() {
  this.namespace = '/api'
  this.timing = 400

  this.post('/v1/login', () => ({ data: { token: '123qwe' } }))
  this.post('/v1/logout', function() {})

  this.get('/v1/users/current', ({ users }) => users.find(1))
  this.put('/v1/users/current', function({ users }) {
    return users.find(1).update(this.normalizedRequestAttrs())
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
    'timed-subscription-project'
  )

  this.get(
    '/proxy/sysupport/subscription-projects/:id',
    'timed-subscription-project'
  )

  this.get('/proxy/sysupport/reports', 'timed-reports')

  this.get(
    '/proxy/sysupport/subscription-orders',
    ({ timedSubscriptionOrders }, request) => {
      return timedSubscriptionOrders.where({
        projectId: request.queryParams.project
      })
    }
  )
  this.post('/proxy/sysupport/subscription-orders', 'timed-subscription-orders')

  this.get(
    '/proxy/sysupport/subscription-packages',
    'timed-subscription-packages'
  )
}
