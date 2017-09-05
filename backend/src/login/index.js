import * as fs from 'fs'
import express from 'express'
import rp from 'request-promise'
import passport from 'passport'
import LdapStrategy from 'passport-ldapauth'
import User from '../user/model'
import config from '../config'

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
    if (err && config.login.ldap_customer) {
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

function loginSuccessful(req, res, next, ldapUser) {
  req.login(ldapUser, async loginError => {
    if (loginError) return next(loginError)

    let claims = {
      iss: config.application.name,
      aud: config.application.host,
      uid: users.get(ldapUser).id
    }

    // ldap login to vault
    const { host, ca } = config.services.vault
    try {
      const resp = await rp({
        method: 'POST',
        uri: `${host}v1/auth/userpass/login/${req.body.username}`,
        body: {
          password: req.body.password
        },
        json: true,
        ca: ca ? fs.readFileSync(ca) : undefined
      })
      req.session.vaultToken = resp.auth.client_token
      req.session.vaultTokenTTL = new Date().getTime()
    } catch (e) {
      console.log('vault auth error', e.message)
    }

    req.session.create(claims, (sessionError, token) => {
      if (sessionError) return next(sessionError)

      res.set('Content-Type', 'application/vnd.api+json')
      return res.send({ data: { token } })
    })
  })
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
  res.redirect('/login')
})
