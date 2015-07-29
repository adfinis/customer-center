import url       from 'url'
import httpProxy from 'express-http-proxy'

const ALLOWED_ENDPOINTS = [
  '/issues.json',
  '/projects.json',
  '/trackers.json'
]

/**
 * Redmine Proxy
 *
 * @class RedmineProxy
 * @public
 */
export default class RedmineProxy {

  /**
   * Creates a new redmine proxy
   *
   * @param {Object} service RedmineProxy configuration object
   * @return {Object} An express http proxy middleware
   * @public
   */
  static createProxy(service) {
    let host = service.https ? `https://${service.host}` : service.host

    return httpProxy(host, new this(service))
  }

  /**
   * Constructor of Redmine Proxy
   *
   * @constructor
   * @param {Object} service RedmineProxy configuration object
   * @public
   */
  constructor(service) {
    this.host      = service.host
    this.apiKey    = service.apiKey
    this.basicAuth = service.basicAuth

    this.filter          = this.filter.bind(this)
    this.intercept       = this.intercept.bind(this)
    this.forwardPath     = this.forwardPath.bind(this)
    this.decorateRequest = this.decorateRequest.bind(this)
  }

  /**
   * Filter unauthorized requests
   *
   * @param {express.Request}  req The request object
   * @param {express.Response} res The response object
   * @return {boolean}
   * @public
   */
  filter(req, res) {
    if (!req.user.hasRedmineAccess()) {
      return false
    }

    // `decorateRequest()` does not have an user object, passing
    // through `req.params` here as workaround
    req.params.switchUser = req.user.get('username')

    for (let allowed of ALLOWED_ENDPOINTS) {
      if (req.url.startsWith(allowed)) {
        return true
      }
    }

    return false
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
   * Decorates the requests and adds some redmine specific headers
   *
   * @param {express.Request} req The request object
   * @return {void}
   * @public
   */
  decorateRequest(req) {
    // `req.params.switchUser` was set in `filter()` as a workaround
    // to the missing user object on `req`
    req.headers['X-Redmine-Switch-User'] = req.params.switchUser

    if (this.apiKey) {
      req.headers['X-Redmine-API-Key'] = this.apiKey
    }

    if (this.basicAuth) {
      req.headers.Authorization = this._getBasicAuth(this.basicAuth)
    }
  }

  /**
   * Create basic auth header
   *
   * @param {Object.string} username Username for authentication with redmine
   * @param {Object.string} password Password for authentication with redmine
   * @return {string}
   * @private
   */
  _getBasicAuth({ username, password }) {
    let encoding = new Buffer(`${username}:${password}`).toString('base64')
    return `Basic ${encoding}`
  }

  /**
   * Intercept the redmine response and remove cookies
   *
   * @param {express.Response} rsp The redmine response
   * @param {string}           data The response data
   * @param {express.Request}  req The initial request
   * @param {express.Response} res Our response to the user
   * @param {Function}         callback Callback to call after the intercept is done
   * @return {void}
   * @public
   */
  intercept(rsp, data, req, res, callback) {
    // Remove redmine cookie from response.
    // I'm not sure if cookie is for the switched user or api access.
    res.removeHeader('set-cookie')

    callback(null, data)
  }
}
