import { Router } from 'express'
import rp from 'request-promise'

let host, token

// helpers for dummy data

function rand(max) {
  return Math.floor(Math.random() * max)
}

function getRandomIP() {
  return `${rand(255)}.${rand(255)}.${rand(255)}.${rand(255)}`
}


async function listVault(path) {
  const rawResponse = await rp({
    uri: `${host}${path}?list=true`,
    headers: {
      'X-Vault-Token': token
    }
  })
  const resp = JSON.parse(rawResponse)
  const result = {}
  if (resp.data && resp.data.keys) {
    result.values = resp.data.keys
      .filter(key => !key.endsWith('/'))
      .reduce((res, key) => {
        res[key] = {
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

export default class VaultProxy {

  static createProxy(service) {
    let vault = new this(service)

    return vault.createRouter()
  }

  constructor(service) {
    host  = service.host
    token = service.token
  }

  createRouter() {
    let router = new Router

    router.get('/list', this.route('list'))

    return router
  }

  route(name) {
    return (req, res, next) =>
      this[name](req, res, next).catch(next)
  }

  async list(req, res, next) {
    const result = await listVault('/v1/secret/')
    res.send(result)
  }
}
