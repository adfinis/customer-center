import config from '../config'
import rp from 'request-promise'

export async function rtLogin(username, password) {
  console.log(username, password)
  const { host, authPath } = config.services.rt
  const res = await rp({
    method: 'post',
    uri: `${host}${authPath}`,
    headers: {
      accept: 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json'
    },
    body: {
      data: {
        type: 'obtain-json-web-tokens',
        id: null,
        attributes: {
          username,
          password
        }
      }
    },
    json: true
  })

  return res.data.token
}

export async function refreshToken(token) {
  const { host, authRefresh } = config.services.rt
  const res = await rp({
    method: 'post',
    uri: `${host}${authRefresh}`,
    headers: {
      accept: 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json'
    },
    body: {
      data: { type: 'refresh-json-web-tokens', attributes: { token } }
    },
    json: true
  })

  return res.data.token
}

export function rtTokenRenew() {
  return async (req, res, next) => {
    if (
      req.session.rtToken &&
      req.session.rtTokenTTL &&
      (new Date().getTime() - req.session.rtTokenTTL) / 1000 >=
        config.services.rt.ttl
    ) {
      try {
        const newToken = await refreshToken(req.session.rtToken)
        req.session.rtToken = newToken
        req.session.rtTokenTTL = new Date().getTime()
        req.session.update()
        next()
      } catch (e) {
        next(e)
      }
    }
    next()
  }
}
