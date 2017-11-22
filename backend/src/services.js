import express from 'express'
import RedmineProxy from './redmine/redmine-proxy'
import RTProxy from './rt/rt-proxy'
import SymonProxy from './symon/symon-proxy'
import VaultProxy from './vault/vault-proxy'
import vaultCustom from './vault/vault-custom'
import SysupportProxy from './sysupport/proxy'
import config from '../config'

let router = new express.Router()

const { redmine, rt, symon, vault, timed } = config.services

router.use('/proxy/redmine', RedmineProxy.createProxy(redmine))

router.use('/rt', RTProxy.createProxy(rt))

router.use('/proxy/symon', SymonProxy.createProxy(symon))

router.use('/vault', vaultCustom(vault))
router.use('/proxy/vault', VaultProxy.createProxy(vault))

router.use('/proxy/sysupport', SysupportProxy.createProxy(timed))

export default router
