import config from '../config'
import rp from 'request-promise'

export async function timedLogin() {
  const { host, user, password, prefix, authPath } = config.services.timed
  const res = await rp({
    method: 'post',
    uri: `${host}${prefix}${authPath}`,
    headers: {
      accept: 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json'
    },
    body: {
      data: {
        type: 'obtain-json-web-tokens',
        id: null,
        attributes: {
          username: user,
          password
        }
      }
    },
    json: true
  })

  return res.data.token
}

export async function refreshToken(token) {
  const { host, prefix, authRefresh } = config.services.timed
  const res = await rp({
    method: 'post',
    uri: `${host}${prefix}${authRefresh}`,
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

export function timedTokenRenew() {
  return async (req, res, next) => {
    if (
      req.session.timedToken &&
      req.session.timedTokenTTL &&
      (new Date().getTime() - req.session.timedTokenTTL) / 1000 >=
        config.services.timed.ttl
    ) {
      try {
        const newToken = await refreshToken(req.session.timedToken)
        req.session.timedToken = newToken
        req.session.timedTokenTTL = new Date().getTime()
        req.session.update()
        next()
      } catch (e) {
        next(e)
      }
    }

    next()
  }
}
