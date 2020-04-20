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
        type: 'token-obtain-pair-views',
        id: null,
        attributes: {
          username: user,
          password
        }
      }
    },
    json: true
  })

  return res.data
}

export async function refreshToken(refreshToken) {
  const { host, prefix, authRefresh } = config.services.timed
  const res = await rp({
    method: 'post',
    uri: `${host}${prefix}${authRefresh}`,
    headers: {
      accept: 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json'
    },
    body: {
      data: { type: 'token-refresh-views', attributes: { refreshToken } }
    },
    json: true
  })

  return res.data.access
}

export function timedTokenRenew() {
  return async (req, res, next) => {
    if (
      req.session.timedTokens.access &&
      req.session.timedTokenTTL &&
      (new Date().getTime() - req.session.timedTokenTTL) / 1000 >=
        config.services.timed.ttl
    ) {
      try {
        const newToken = await refreshToken(req.session.timedTokens.refresh)
        req.session.timedTokens.access = newToken
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
