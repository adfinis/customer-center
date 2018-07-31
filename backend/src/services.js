import express from 'express'
import VaultProxy from './vault/vault-proxy'
import vaultCustom from './vault/vault-custom'
import TimedProxy from './timed/proxy'
import gitlabProxy from './gitlab/proxy'
import rtProxy from './rt/proxy'
import config from './config'

let router = new express.Router()

const { vault, timed, gitlab, rt } = config.services

router.use('/vault', vaultCustom(vault))
router.use('/proxy/vault', VaultProxy.createProxy(vault))

router.use('/proxy/timed', TimedProxy.createProxy(timed))

router.use('/proxy/gitlab', gitlabProxy(gitlab))

router.use('/proxy/rt', rtProxy(rt))

export default router
