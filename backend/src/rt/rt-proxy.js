import Bookshelf  from 'bookshelf'
import knex       from 'knex'
import { Router } from 'express'

export default class RTProxy {

  static createProxy(service) {
    let rt = new this(service)

    return rt.createRouter()
  }

  constructor(r) {
    this.host     = r.host
    this.username = r.username
    this.password = r.password

    this.bookshelf = new Bookshelf(knex(r.knex))
    this.Ticket    = this.bookshelf.Model.extend({
      tableName: 'adsycc'
    })
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
    let { content: emails }       = req.user.get('emails')

    offset = +offset
    limit  = +limit

    if (req.query.emails) {
      emails = req.query.emails.filter(email =>
        emails.includes(email)
      )
    }

    let tickets = this.Ticket.query(q => {
      q.where('memberEmail', 'in', emails)
       .groupBy('id')
       .orderBy('lastUpdated', 'desc')
       .offset(offset)
       .limit(limit)
    })

    let total = this.Ticket.query(q => {
      q.where('memberEmail', 'in', emails)
       .count('DISTINCT id as count')
    })

    tickets = await tickets.fetchAll()
    total   = (await total.fetch()).get('count')

    res.send({ data: { tickets, offset, limit, total } })
  }
}
