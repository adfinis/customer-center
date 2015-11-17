import url       from 'url'
import httpProxy from 'express-http-proxy'

/**
 * TimescoutProxy
 *
 * @class TimescoutProxy
 * @public
 */
export default class TimescoutProxy {

  /**
   * Creates a new TimescoutProxy intance
   *
   * @param {Object} service Timescout configuration
   * @return {Object} An express http proxy middleware
   * @public
   */
  static createProxy(service) {
    return httpProxy(service.host, new this(service))
  }

  /**
   * Constructor of TimescoutProxy
   *
   * @constructor
   * @param {Object} service TimescoutProxy configuration object
   * @public
   */
  constructor(service) {
    this.host   = service.host
    this.apiKey = service.apiKey

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
    // `decorateRequest()` does not have an user object, passing
    // through `req.params` here as workaround
    req.params.sysupport = req.user.get('sysupport')

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
    req.headers['X-Timescout-API-Key'] = this.apiKey

    // `req.params.username` was set in `forwardPath()` as a workaround
    // to the missing user object on `req`
    req.path += req.path.includes('?') ? '&' : '?'
    req.path += `user=${encodeURIComponent(req.params.sysupport)}`
  }
}
