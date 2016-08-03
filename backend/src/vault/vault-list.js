import rp   from 'request-promise'
import wrap from 'express-async-wrap'

let host, token, prefix

function addAuth(request) {
  return Object.assign({}, request, { headers: { 'X-Vault-Token': token }})
}

function stripPrefix(path) {
  if (path.startsWith(prefix)) {
    return path.substring(prefix.length)
  }
  return path
}
// helpers for dummy data

function rand(max) {
  return Math.floor(Math.random() * max)
}

function getRandomIP() {
  return `${rand(255)}.${rand(255)}.${rand(255)}.${rand(255)}`
}


async function listVault(path) {
  const rawResponse = await rp(addAuth({
    uri: `${host}${path}?list=true`
  }))
  const resp = JSON.parse(rawResponse)
  const result = {}
  if (resp.data && resp.data.keys) {
    result.values = resp.data.keys
      .filter(key => !key.endsWith('/'))
      .reduce((res, key) => {
        res[key] = {
          path: stripPrefix(path + key),
          ip: getRandomIP(),
          desc: 'Beschreibung'
        }
        return res
      }, {})

    result.children = {}
    await Promise.all(resp.data.keys
      .filter(key => key.endsWith('/'))
      .map(async key => {
        result.children[key] = await listVault(path + key)
      })
    )
  }
  return result
}

export default function vaultListhandler(service) {
  host = service.host
  token = service.token
  prefix = service.prefix

  return wrap(async (req, res) => {
    res.send(await listVault(service.prefix))
  })
}
