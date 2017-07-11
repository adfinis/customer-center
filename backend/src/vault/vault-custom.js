import * as fs from 'fs'
import url from 'url'
import rp from 'request-promise'
import { Router } from 'express'
import bodyParser from 'body-parser'

import list from './vault-list'

let host, prefix, auth

export function getAuthenticator(token, caPath) {
  return options => {
    return Object.assign({}, options, {
      headers: { 'X-Vault-Token': token },
      ca: caPath ? fs.readFileSync(caPath) : undefined
    })
  }
}

function getCleanPath(path, method) {
  return path.startsWith(method) ? path.substr(method.length) : path
}

async function get(req, res) {
  const path = getCleanPath(req.path, '/get/')

  const uri = url.resolve(host, prefix) + path

  const rawResponse = await rp(auth({ uri }))
  const resp = JSON.parse(rawResponse)
  res.send({
    secret: resp.data
  })
}

export default function vaultGet(service) {
  host = service.host
  prefix = service.prefix
  auth = getAuthenticator(service.token, service.ca)

  const router = new Router()
  router.use(bodyParser.json())
  router.get('/get/*', get)
  router.get('/list', list(service))
  return router
}
