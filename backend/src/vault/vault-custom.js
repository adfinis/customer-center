import url from 'url'
import rp   from 'request-promise'
import { Router } from 'express'
import bodyParser    from 'body-parser'

import list from './vault-list'
import Vault from './model'

let host, token, prefix

function addAuth(request) {
  return Object.assign({}, request, { headers: { 'X-Vault-Token': token }})
}

function getCleanPath(path, method) {
  return path.startsWith(method) ? path.substr(method.length) : path
}

async function get(req, res) {
  const path = getCleanPath(req.path, '/get/')

  const uri = url.resolve(host, prefix) + path

  const rawResponse = await rp(addAuth({ uri }))
  const resp = JSON.parse(rawResponse)
  const meta = await Vault.forge().where('path', path).fetch()
  res.send({
    secret: resp.data,
    meta: meta ? meta.get('meta') : {}
  })
}

async function setMeta(req, res) {
  const path = getCleanPath(req.path, '/meta/')
  const meta = req.body
  const entry = await Vault.forge().where('path', path).fetch()
  let result
  if (entry) {
    await entry.set('meta', req.body).save()
    result = entry
  }
  else {
    result = await Vault.forge({ path, meta }).save()
  }
  res.status(200).send(result)
}

export default function vaultGet(service) {
  host = service.host
  token = service.token
  prefix = service.prefix

  const router = new Router
  router.use(bodyParser.json())
  router.get('/get/*', get)
  router.get('/list', list(service))
  router.post('/meta/*', setMeta)
  return router
}
