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
    this.host   = service.host
  }

  createRouter() {
    let router = new Router

    router.get('/hosts', this.route('hosts'))

    return router
  }

  route(name) {
    return (req, res, next) =>
      this[name](req, res, next).catch(next)
  }

  async hosts(req, res, next) {
    let symonGroup = req.user.getGroups().find(g => g.endsWith('mon'))
    let settings = { app_name: 'adsycc', amq_host: this.host }
    let syrpc = new SyRPCClient(settings)
    await syrpc.init() 

    let resultID = syrpc.putRequest('get_hosts', { ldap_group: symonGroup })
    let hosts = await syrpc.getResult(resultID, 60000)
    console.log(hosts)

    res.send({ data: {} })
  }
}
