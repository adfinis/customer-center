import { getAuthenticator } from './vault-custom'
import rp from 'request-promise'
import url from 'url'
import config from '../config'

/**
 * If the defined TTL of the vault token is expired, it will try to renew it
 * @return {function} vault token renew middleware
 */
export default function vaultTokenRenew() {
  return function(req, res, next) {
    const timeElapsed = new Date().getTime() - req.session.vaultTokenTTL
    const vaultService = config.services.find(s => s.type === 'vault')
    if (timeElapsed >= vaultService.ttl) {
      try {
        renewToken(req.session.vaultToken, vaultService)
          .then(() => {
            req.session.vaultTokenTTL = new Date().getTime()
            req.session.update()
          })
          .catch(function(err) {
            next(err)
          })
          .finally(() => {
            next()
          })
      } catch (e) {
        next(e)
      }
    } else {
      next()
    }
  }
}

/**
 * Renew the ttl of the client token
 * @param  {String} token  Vault client token
 * @param  {String} host   Vault host
 * @param  {String} prefix Vault API prefix eg v1
 * @param  {String} ca     Certificate path
 * @return {Promise}       Request promise
 */
function renewToken(token, { host, prefix, ca }) {
  const auth = getAuthenticator(ca)
  const uri = `${url.resolve(host, prefix)}auth/token/renew`
  const payload = { token }
  const authR = auth(token, { method: 'POST', uri, body: payload, json: true })
  return rp(authR)
}
