import express from 'express'
import RedmineProxy from './redmine/redmine-proxy'
import RTProxy from './rt/rt-proxy'
import TimescoutProxy from './timescout/timescout-proxy'
import SymonProxy from './symon/symon-proxy'
import VaultProxy from './vault/vault-proxy'
import vaultCustom from './vault/vault-custom'
import config from '../config.json'

let router = new express.Router()
export default router

const services = {
  redmine(service) {
    router.use(`/proxy/${service.host}`, RedmineProxy.createProxy(service))
  },
  rt(service) {
    router.use('/rt', RTProxy.createProxy(service))
  },
  timescout(service) {
    router.use('/proxy/timescout', TimescoutProxy.createProxy(service))
  },
  symon(service) {
    router.use('/proxy/symon', SymonProxy.createProxy(service))
  },
  vault(service) {
    router.use('/vault', vaultCustom(service))
    router.use('/proxy/vault', VaultProxy.createProxy(service))
  }
}

for (let service of config.services) {
  if (service.type in services) {
    services[service.type](service)
  }
}
