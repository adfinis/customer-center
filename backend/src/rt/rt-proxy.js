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
    let tickets = this.Ticket.query(q => {
      q.where('memberEmail', '=', 'root@localhost')
       .groupBy('id')
       .orderBy('lastUpdated', 'desc')
       .limit(5)
    })

    tickets = await tickets.fetchAll()

    res.send({ data: { tickets } })
  }
}
