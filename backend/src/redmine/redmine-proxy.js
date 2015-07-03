import url       from 'url'
import httpProxy from 'express-http-proxy'

const ALLOWED_ENDPOINTS = [
  '/issues.json',
  '/projects.json',
  '/trackers.json'
]

export default class RedmineProxy {

  static createProxy(service) {
    return httpProxy(service.host, new this(service))
  }

  constructor(r) {
    this.host   = r.host
    this.apiKey = r.apiKey

    this.filter          = this.filter.bind(this)
    this.intercept       = this.intercept.bind(this)
    this.forwardPath     = this.forwardPath.bind(this)
    this.decorateRequest = this.decorateRequest.bind(this)
  }

  getRedmineUser(user) {
    return !user ||
           !user.services ||
           !user.services.redmine ||
           !user.services.redmine[this.host] ||
           !user.services.redmine[this.host].user
  }

  filter(req, res) {
    let redmineUser = this.getRedmineUser(req.user)

    if (!redmineUser) {
      return false
    }

    req.params.switchUser = redmineUser

    for (let allowed of ALLOWED_ENDPOINTS) {
      if (req.url.startsWith(allowed)) {
        return true
      }
    }

    return false
  }

  forwardPath(req, res) {
    return url.parse(req.url).path
  }

  decorateRequest(req) {
    req.headers['X-Redmine-API-Key']     = this.apiKey
    req.headers['X-Redmine-Switch-User'] = req.params.switchUser
  }

  intercept(rsp, data, req, res, callback) {
    // Remove redmine cookie from response.
    // I'm not sure if cookie is for the switched user or api access.
    res.removeHeader('set-cookie')

    callback(null, data)
  }
}
