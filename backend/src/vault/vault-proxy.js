import url       from 'url'
import httpProxy from 'express-http-proxy'

/**
 * VoltProxy
 *
 * @class VoltProxy
 * @public
 */
export default class VoltProxy {

  /**
   * Creates a new VaultProxy intance
   *
   * @param {Object} service Vault configuration
   * @return {Object} An express router
   * @public
   */
  static createProxy(service) {
    return httpProxy(service.host, new this(service))
  }

  /**
   * Constructor of VaultProxy
   *
   * @constructor
   * @param {Object} service VaultProxy configuration object
   * @public
   */
  constructor(service) {
    this.host     = service.host
    this.token    = service.token

    this.forwardPath     = this.forwardPath.bind(this)
    this.decorateRequest = this.decorateRequest.bind(this)
  }

  /**
   * The path to forward
   *
   * @param {express.Request}  req The request object
   * @param {express.Response} res The response object
   * @return {string}
   * @public
   */
  forwardPath(req, res) {
    return url.parse(req.url).path
  }

  /**
   * Decorates the requests and adds some timescout specific headers
   *
   * @param {express.Request} req The request object
   * @return {void}
   * @public
   */
  decorateRequest(req) {
    req.headers['X-Vault-Token'] = this.token
  }
}
