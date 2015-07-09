import url       from 'url'
import httpProxy from 'express-http-proxy'

export default class TimescoutProxy {

  static createProxy(service) {
    return httpProxy(service.host, new this(service))
  }

  constructor(t) {
    this.host   = t.host
    this.apiKey = t.key

    this.forwardPath = this.forwardPath.bind(this)
    this.decorateRequest = this.decorateRequest.bind(this)
  }

  forwardPath(req, res) {
    return url.parse(req.url).path
  }

  decorateRequest(req) {
    req.headers['X-Timescout-API-Key'] = this.apiKey
  }
}
