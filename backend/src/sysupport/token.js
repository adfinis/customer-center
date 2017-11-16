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
