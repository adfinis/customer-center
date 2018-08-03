import config from '../config'
import rp from 'request-promise'

export async function rtLogin(username, password) {
  const { host, authPath } = config.services.rt
  const res = await rp({
    method: 'post',
    uri: `${host}${authPath}`,
    headers: {
      Accept: 'application/json'
    },
    body: {
      username,
      password
    },
    json: true
  })

  return res.token
}

export async function refreshToken(token) {
  const { host, authRefresh } = config.services.rt
  const res = await rp({
    method: 'post',
    uri: `${host}${authRefresh}`,
    headers: {
      accept: 'application/json'
    },
    body: {
      token
    },
    json: true
  })

  return res.token
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
      } catch (e) {
        next(e)
      }
    }
    next()
  }
}
