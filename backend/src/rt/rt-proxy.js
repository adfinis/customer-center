import Bookshelf  from 'bookshelf'
import knex       from 'knex'
import { Router } from 'express'

export default class RTProxy {

  static createProxy(service) {
    let rt = new this(service)

    return rt.createRouter()
  }

  constructor(r) {
    this.knex = r.knex
  }

  createRouter() {
    let router = new Router

    router.get('/tickets', this.route('tickets'))

    return router
  }

  route(name) {
    return (req, res, next) =>
      this[name](req, res, next).catch(next)
  }

  async tickets(req, res, next) {
    let { offset = 0, limit = 5 } = req.query
    let { content: emails = [] }  = req.user.get('emails') || {}

    emails.unshift(req.user.get('email'))

    offset = +offset
    limit  = +limit

    if (req.query.emails) {
      emails = req.query.emails.filter(email =>
        emails.includes(email)
      )
    }

    let connection = knex(this.knex)
    let bookshelf  = new Bookshelf(connection)
    let Ticket     = bookshelf.Model.extend({
      tableName: 'adsycc'
    })

    let tickets = Ticket.query(q => {
      q.where('memberEmail', 'in', emails)
       .groupBy('id')
       .orderBy('lastUpdated', 'desc')
       .offset(offset)
       .limit(limit)
    })

    let total = Ticket.query(q => {
      q.where('memberEmail', 'in', emails)
       .count('DISTINCT id as count')
    })

    tickets = await tickets.fetchAll()
    total   = (await total.fetch()).get('count')

    connection.destroy()

    res.send({ data: { tickets, offset, limit, total } })
  }
}
