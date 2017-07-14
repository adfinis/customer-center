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
  redmine(cfg) {
    router.use('/proxy/redmine', RedmineProxy.createProxy(cfg))
  },
  rt(cfg) {
    router.use('/rt', RTProxy.createProxy(cfg))
  },
  timescout(cfg) {
    router.use('/proxy/timescout', TimescoutProxy.createProxy(cfg))
  },
  symon(cfg) {
    router.use('/proxy/symon', SymonProxy.createProxy(cfg))
  },
  vault(cfg) {
    router.use('/vault', vaultCustom(cfg))
    router.use('/proxy/vault', VaultProxy.createProxy(cfg))
  }
}

for (let serviceCfg of config.services) {
  if (serviceCfg.type in services) {
    services[serviceCfg.type](serviceCfg)
  }
}
