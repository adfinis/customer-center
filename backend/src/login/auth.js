import rp from 'request-promise'

async function authSubscription({ host, auth }) {
  try {
    const { username, password } = auth
    const data = {
      type: 'obtain-json-web-tokens',
      id: null,
      attributes: {
        username,
        password
      }
    }
    const resp = await rp({
      method: 'POST',
      uri: `${host}api/v1/auth/login`,
      body: {
        data
      },
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json'
      },
      json: true
    })
    return resp.data.token
  } catch (e) {
    throw Object.assign({}, 'subscription auth error', e)
  }
}
module.exports = { authSubscription }
