import { Router } from 'express'
import { SyRPCClient } from 'syrpc'

/**
 * SymonProxy
 *
 * @class SymonProxy
 * @public
 */
export default class SymonProxy {
 
  /**
   * Creates a new SymonProxy intance
   *
   * @param {Object} service Symon configuration
   * @return {Object} An express router
   * @public
   */
  static createProxy(service) {
    let symon = new this(service)

    return symon.createRouter()
  }

  /**
   * Constructor of SymonProxy
   *
   * @constructor
   * @param {Object} service SymonProxy configuration object
   * @public
   */
  constructor(service) {
    this.host     = service.host
    this.user     = service.user
    this.password = service.password
    this.queues   = service.queues
    this.app      = service.app
    this.searchDN = service.searchDN
    this.ttl      = service.ttl
  }

  /**
   * Create a SymonProxy router
   *
   * @return {Object} An express router
   * @public
   */
  createRouter() {
    let router = new Router

    router.get('/hosts', this.route('hosts'))

    return router
  }

  /**
   * Creates a promise aware route callback
   *
   * @name {string} Name of the route function
   * @return {function}
   * @public
   */
  route(name) {
    return (req, res, next) =>
      this[name](req, res, next).catch(next)
  }

  /**
   * Fetch hosts with their services
   *
   * @param {express.Request} req Request object
   * @param {express.Response} res Response object
   * @param {function} next Express next callback
   * @return {void}
   * @public
   */
  async hosts(req, res, next) {
    let symonGroup = req.user.getGroups().find(g => g.endsWith('-mon'))
    symonGroup = 'adsy-user'
    let settings = {
      app_name: this.app,
      amq_host: this.host,
      amq_user: this.user,
      amq_password: this.password,
      amq_num_queues: this.queues
    }
    let syrpc = new SyRPCClient(settings)
    await syrpc.init() 

    let searchDN = `cn=${symonGroup},${this.searchDN}`
    let resultID = syrpc.putRequest('get_host_list_by_ldap_group', { ldap_group: searchDN })
    let hosts = await syrpc.getResult(resultID, this.ttl)

    let requests = hosts.data.map(host =>
      syrpc.putRequest('get_service_list_by_host', { host_id: host.id })
    )
    .map(resultID =>
      syrpc.getResult(resultID, this.ttl)
    )

    let results = await Promise.all(requests)

    for (let [ key, host ] of hosts.data.entries()) {
      host.services = results[key].data
      for (let service of host.services) {
        service.host = undefined
      }
    }

    res.send({ data: { hosts: hosts.data } })
  }
}
