import config from '../config'
import fetch from 'node-fetch'

export async function timedLogin() {
  const { host, tokenPath, clientId, clientSecret } = config.keycloak

  const data = new URLSearchParams()
  data.append('grant_type', 'client_credentials')
  data.append('client_id', clientId)
  data.append('client_secret', clientSecret)

  const uri = host + tokenPath
  const options = {
    method: 'POST',
    body: data
  }

  const response = await fetch(uri, options)

  // Do not use the refresh token. The token should
  // not be included in the response anyway.
  // https://tools.ietf.org/html/rfc6749#section-4.4.3
  const { access_token, expires_in } = await response.json()

  return {
    access: access_token,
    expires: Date.now() + expires_in * 1000
  }
}

export function timedTokenRenew() {
  return async (req, res, next) => {
    const token = req.session.timedTokens || {}

    if (token.expires && token.expires <= Date.now()) {
      try {
        req.session.timedTokens = await timedLogin()
        req.session.update()
      } catch (e) {
        next(e)
      }
    }

    next()
  }
}
