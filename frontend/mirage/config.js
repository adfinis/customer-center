import { Response } from 'ember-cli-mirage'
import moment from 'moment'

export default function() {
  /*
 * Create pagination for mirage.
 * @param models
 * @param page
 * @param pageSize
 * @returns json
 * @author Jonas Cosandey (jonas.cosandey@adfinis-sygroup.ch)
 */
  const _pagination = (models, page, pageSize) => {
    pageSize = parseInt(pageSize)
    page = parseInt(page)

    let pages = [],
      pageCount = Math.ceil(models.length / pageSize)

    for (let i = 0; i < pageCount; i++) {
      let start = pageSize * i,
        end = start + pageSize
      pages.push(models.slice(start, end))
    }

    let json = models.length
      ? this.serializerOrRegistry.serialize(pages[page - 1])
      : this.serializerOrRegistry.serialize(models)
    json.meta = { pagination: { page_size: pageSize, page, pages: pageCount } }
    json.links = {
      next:
        page < pageCount
          ? `localhost?page_size=${pageSize}&page=${page + 1}`
          : '',
      prev: page > 1 ? `localhost?page_size=${pageSize}&page=${page - 1}` : ''
    }

    return json
  }

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

  this.get(
    '/proxy/rt/tickets',
    (
      { rtTickets },
      { queryParams: { page_size: pageSize, page, status, search } }
    ) => {
      let tickets = rtTickets.all()

      if (status) {
        tickets = tickets.filter(ticket => ticket.status === status)
      }

      if (search) {
        tickets = tickets.filter(ticket =>
          ticket.subject.toLowerCase().includes(search.trim().toLowerCase())
        )
      }

      return _pagination(tickets, page, pageSize)
    }
  )

  this.get('/proxy/gitlab/groups/:group/', (scheme, req) => {
    let group = req.params.group
    let id = group.slice(-1)
    let projects = []

    for (let i = 0; i < id * 2; i++) {
      projects.push({
        id: i,
        name: `project${i}`,
        name_with_namespace: `${group} / project${i}`,
        path: `project${i}`,
        path_with_namespace: `${group}/project${i}`,
        namespace: {
          id,
          name: group,
          path: group,
          kind: 'group',
          full_path: group
        }
      })
    }
    return {
      id,
      name: group,
      path: group,
      full_name: group,
      projects
    }
  })

  this.get('/proxy/gitlab/projects/:path/repository/commits', (schema, req) => {
    let commits = []

    for (let i = 0; i < 100; i++) {
      commits.push(moment().subtract(i, 'days'))
    }
    if (req.queryParams.since) {
      return commits.filter(commit => commit > moment(req.queryParams.since))
    }
    return commits
  })

  this.get('/proxy/gitlab/:group/:project/pipelines.json', () => {
    return {
      pipelines: [
        {
          active: false,
          flags: {
            latest: true
          },
          details: {
            status: {
              text: 'passed'
            },
            stages: [
              {
                name: 'test',
                status: {
                  text: 'passed'
                }
              }
            ]
          },
          ref: {
            name: 'master'
          }
        },
        {
          active: false,
          flags: {
            latest: true
          },
          details: {
            status: {
              text: 'failed'
            },
            stages: [
              {
                name: 'test',
                status: {
                  text: 'failed'
                }
              },
              {
                name: 'deploy',
                status: {
                  text: 'passed'
                }
              }
            ]
          },
          ref: {
            name: 'prod'
          }
        },
        {
          active: false,
          flags: {
            latest: true
          },
          details: {
            status: {
              text: 'running'
            },
            stages: [
              {
                name: 'test',
                status: {
                  text: 'running'
                }
              },
              {
                name: 'test',
                status: {
                  text: 'pending'
                }
              },
              {
                name: 'test',
                status: {
                  text: 'created'
                }
              }
            ]
          },
          ref: {
            name: 'test'
          }
        }
      ]
    }
  })
}
