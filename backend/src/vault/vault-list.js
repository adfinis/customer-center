import rp   from 'request-promise'
import wrap from 'express-async-wrap'
import _flattenDeep from 'lodash/flattenDeep'

import Vault from './model'
import { getAuthenticator } from './vault-custom'

let host, prefix, auth

function stripPrefix(path) {
  if (path.startsWith(prefix)) {
    return path.substring(prefix.length)
  }
  return path
}

async function listVault(path) {
  const rawResponse = await rp(auth({
    uri: `${host}${path}?list=true`
  }))
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
    await Promise.all(resp.data.keys
      .filter(key => key.endsWith('/'))
      .map(async key => {
        result.children[key] = await listVault(path + key)
      })
    )
  }

  return result
}


function findPaths(node) {
  const paths = Object.keys(node.values).map(key => node.values[key].path)
  return [
    ...paths,
    ..._flattenDeep(
      Object.keys(node.children).map(key => findPaths(node.children[key]))
    )
  ]
}

function addToPath(node, meta) {
  node.values = Object.keys(node.values).reduce((prev, curr) => {
    const val = node.values[curr]
    const metaData = meta[val.path]
    prev[curr] = Object.assign(val, metaData)
    return prev
  }, {})
  node.children = Object.keys(node.children).reduce((prev, curr) => {
    const child = node.children[curr]
    prev[curr] = addToPath(child, meta)
    return prev
  }, {})
  return node
}

async function aggregateVault(tree) {
  let meta = await Vault.forge()
    .where('path', 'in', findPaths(tree))
    .fetchAll()
  meta = await meta.reduceThen((prev, curr) => {
    prev[curr.get('path')] = curr.get('meta')
    return prev
  }, {})

  return addToPath(tree, meta)
}

export default function vaultListhandler(service) {
  host = service.host
  prefix = service.prefix
  auth = getAuthenticator(service.token, service.ca)

  return wrap(async (req, res) => {
    res.send(await aggregateVault(await listVault(service.prefix + 'internal/')))
  })
}
