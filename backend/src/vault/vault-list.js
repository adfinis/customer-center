import rp from 'request-promise'
import wrap from 'express-async-wrap'

import { getAuthenticator } from './vault-custom'

let host, prefix, auth

function stripPrefix(path) {
  if (path.startsWith(prefix)) {
    return path.substring(prefix.length)
  }
  return path
}

async function listVault(token, path) {
  try {
    const rawResponse = await rp(
      auth(token, {
        uri: `${host}${path}?list=true`
      })
    )
    const resp = JSON.parse(rawResponse)
    const result = {}
    if (resp.data && resp.data.keys) {
      result.values = resp.data.keys
        .filter(key => !key.endsWith('/'))
        .reduce((res, key) => {
          res[key] = { path: stripPrefix(path + key) }
          return res
        }, {})

      result.children = {}
      await Promise.all(
        resp.data.keys.filter(key => key.endsWith('/')).map(async key => {
          result.children[key] = await listVault(token, path + key)
        })
      )
    }

    return result
  } catch (e) {
    throw e
  }
}

export default function vaultListhandler(service) {
  host = service.host
  prefix = service.prefix
  auth = getAuthenticator(service.ca)

  return wrap(async (req, res) => {
    try {
      res.send(
        await listVault(
          req.session.vaultToken,
          service.prefix + service.backend
        )
      )
    } catch (e) {
      res.status(e.statusCode).send(e.message)
    }
  })
}
