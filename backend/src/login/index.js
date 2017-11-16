import * as fs from 'fs'
import express from 'express'
import rp from 'request-promise'
import passport from 'passport'
import LdapStrategy from 'passport-ldapauth'
import User from '../user/model'
import config from '../config'
import { timedLogin } from '../sysupport/token'
import { getCustomer as getTimedCustomer } from '../sysupport/custom'

passport.use(
  'ldapauth-user',
  new LdapStrategy({
    server: Object.assign({}, config.ldap, config.login.ldap)
  })
)

passport.use(
  'ldapauth-customer',
  new LdapStrategy({
    server: Object.assign({}, config.ldap, config.login.ldapCustomer)
  })
)

// Passport doesn't set req.user directly after login
// save user in weakmap with the ldap response as key
let users = new WeakMap()

passport.serializeUser(async (ldap, done) => {
  try {
    users.set(ldap, await User.syncLdap(ldap))
    done(null, ldap.uid)
  } catch (e) {
    done(e)
  }
})
passport.deserializeUser(async (uid, done) => {
  try {
    let user = await new User({ username: uid }).fetch({ required: true })

    done(null, user)
  } catch (e) {
    done(e)
  }
})

const router = new express.Router()
export default router

/**
 * Get the navigator language
 *
 * @param {string} acceptLanguage The accept-language header
 * @return {string|void}
 */
function getLanguage(acceptLanguage) {
  // Example string: en-US,en-GB;q=0.8,en;q=0.7,de-CH;q=0.5,de-DE;q=0.3,de;q=0.2
  let language = acceptLanguage
    .split(',')
    .find(l => l.startsWith('en') || l.startsWith('de'))

  if (!language) {
    return null
  }

  language = language.split('-')[0]
  return ['en', 'de'].includes(language) ? language : null
}

router.post('/login', (req, res, next) => {
  login('ldapauth-user', req, res, err => {
    if (err && config.login.ldapCustomer) {
      return login('ldapauth-customer', req, res, next)
    } else if (err) {
      return next(err)
    }
    return next(...arguments)
  })
})

function login(strategy, req, res, next) {
  passport.authenticate(strategy, (err, ldapUser, info, status) => {
    if (err) return next(err)
    if (!ldapUser) return next({ status, message: info.message })

    if (!ldapUser.lang && req.headers['accept-language']) {
      ldapUser.lang = getLanguage(req.headers['accept-language'])
    }

    loginSuccessful(req, res, next, ldapUser)
  })(req, res, next)
}

/* eslint-disable complexity, max-statements */
function loginSuccessful(req, res, next, ldapUser) {
  const { body: { username, password } } = req

  req.login(ldapUser, async loginError => {
    if (loginError) return next(loginError)

    let claims = {
      iss: config.application.name,
      aud: config.application.host,
      uid: users.get(ldapUser).id
    }

    const userGroups = users.get(ldapUser).getGroupNames()
    const isMember = group => userGroups.some(g => g.endsWith(group))

    // If user is in the vault group, get vault token
    if (isMember('vault')) {
      req.session = await addVaultTokenToSession(
        req.session,
        username,
        password
      )
    }

    // If user is in the sysupport group, get timed token
    if (isMember('sysupport')) {
      req.session = await addTimedTokenToSession(
        req.session,
        users.get(ldapUser)
      )
    }

    // If user is in the sysupport group, get timed token
    if (userGroups.some(g => g.endsWith('sysupport'))) {
      try {
        req.session.timedToken = await timedLogin()
        req.session.timedTokenTTL = new Date().getTime()
        req.session.timedCustomer = await getTimeCustomer(
          req.session.timedToken,
          users.get(ldapUser)
        )
      } catch (e) {
        console.log('timed auth error', e.message)
      }
    }

    req.session.create(claims, (sessionError, token) => {
      if (sessionError) return next(sessionError)

      res.set('Content-Type', 'application/vnd.api+json')
      return res.send({ data: { token } })
    })
  })
}
/* eslint-enable complexity, max-statements */

async function addVaultTokenToSession(session, username, password) {
  try {
    session.vaultToken = await vaultLogin(username, password)
    session.vaultTokenTTL = new Date().getTime()
  } catch (e) {
    console.log('vault auth error', e.message)
  }

  return session
}

async function addTimedTokenToSession(session, user) {
  try {
    session.timedToken = await timedLogin()
    session.timedTokenTTL = new Date().getTime()
    session.timedCustomer = await getTimedCustomer(session.timedToken, user)
  } catch (e) {
    console.log('timed auth error', e.message)
  }

  return session
}

/**
 * Log in to vault with AdsyCC credentials
 *
 * @param {string} username username
 * @param {string} password password
 * @return {string} vault token
 */
async function vaultLogin(username, password) {
  const { host, ca, authBackend } = config.services.vault
  const resp = await rp({
    method: 'POST',
    uri: `${host}v1/auth/${authBackend}/login/${username}`,
    body: {
      password
    },
    json: true,
    ca: ca ? fs.readFileSync(ca) : undefined
  })
  return resp.auth.client_token
}

router.post('/logout', async (req, res) => {
  const { host, ca } = config.services.vault
  try {
    await rp({
      method: 'POST',
      uri: `${host}v1/auth/token/revoke`,
      headers: {
        'X-Vault-Token': req.session.vaultToken
      },
      body: {
        token: req.session.vaultToken
      },
      json: true,
      ca: ca ? fs.readFileSync(ca) : undefined
    })
  } catch (e) {
    console.error('Vault revoke error:', e.message)
  }

  req.logout()
  res.status(200).end()
})
