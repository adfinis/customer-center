import request    from 'request-promise'
import { Router } from 'express'

const API_PATH     = '/REST/1.0'
const MATCH_SEARCH = /^(\d+): (.*)$/

export default class RTProxy {

  static createProxy(service) {
    let rt = new this(service)

    return rt.createRouter()
  }

  constructor(r) {
    this.host     = r.host
    this.username = r.username
    this.password = r.password
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

  getTicketURL(id) {
    return `${this.host}/Ticket/Display.html?id=${id}`
  }

  async tickets(req, res, next) {
    let { email } = { email: 'damian.senn@adfinis-sygroup.ch' } // req.user.email

    let data = await this.request('/search/ticket', this.getParams(email))

    let tickets = []
    for (let line of data.split('\n')) {
      let matches = MATCH_SEARCH.exec(line)

      if (!matches) continue

      let [ match, id, title ] = matches

      tickets.push({ id, title, url: this.getTicketURL(id) })
    }

    res.send({ tickets })
  }

  getQuery(email) {
    return `Requestor.EmailAddress LIKE '${email}' OR ` +
           `Cc.EmailAddress LIKE '${email}' OR ` +
           `Watcher.EmailAddress LIKE '${email}'`
  }

  getParams(email) {
    return {
      query:       this.getQuery(email),
      orderby:     '-LastUpdated',
      format:      's',
      RowsPerPage: 3,
      user:        this.username,
      pass:        this.password
    }
  }

  async request(path, qs) {
    let headers = { Referer: this.host }
    return request(`${this.host}${API_PATH}${path}`, { qs, headers })
  }
}
