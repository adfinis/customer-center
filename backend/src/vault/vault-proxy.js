import * as fs   from 'fs'
import url       from 'url'
import path      from 'path'
import httpProxy from 'express-http-proxy'

/**
 * Vault Proxy
 *
 * @class VaultProxy
 * @public
 */
export default class VaultProxy {

  /**
   * Creates a new vault proxy
   *
   * @param {Object} service VaultProxy configuration object
   * @return {Object} An express http proxy middleware
   * @public
   */
  static createProxy(service) {
    return httpProxy(service.host, new this(service))
  }

  /**
   * Constructor of Vault Proxy
   *
   * @constructor
   * @param {Object} service VaultProxy configuration object
   * @public
   */
  constructor(service) {
    this.host      = service.host
    this.token     = service.token
    this.prefix    = service.prefix
    this.ca        = fs.readFileSync(service.ca)

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
    const r = url.parse(path.join(this.prefix, req.url)).path
    return r
  }

  /**
   * Adds vault specific headers
   *
   * @param {express.Request} req The request object
   * @return {void}
   * @public
   */
  decorateRequest(req) {
    if (this.token) {
      req.headers['X-Vault-Token'] = this.token
      req.ca = this.ca
    }
  }
}
