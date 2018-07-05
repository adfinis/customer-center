import config from '../config'
import rp from 'request-promise'

export async function getCustomer(timedToken, user) {
  const { host, prefix } = config.services.timed

  const res = await rp({
    method: 'get',
    uri: `${host}${prefix}/customers`,
    headers: {
      accept: 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json',
      Authorization: `Bearer ${timedToken}`
    },
    qs: {
      reference: user.attributes.shortname
    },
    json: true
  })
  return res.data[0]
}
