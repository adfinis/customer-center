import express from 'express'
import VaultProxy from './vault/vault-proxy'
import vaultCustom from './vault/vault-custom'
import SysupportProxy from './sysupport/proxy'
import config from '../config'

let router = new express.Router()

const { vault, timed } = config.services

router.use('/vault', vaultCustom(vault))
router.use('/proxy/vault', VaultProxy.createProxy(vault))

router.use('/proxy/sysupport', SysupportProxy.createProxy(timed))

export default router
