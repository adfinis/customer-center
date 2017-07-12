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
    server: Object.assign({}, config.ldap, config.login.ldap_customer)
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
  let languages = acceptLanguage.split(',')
  let language = languages.find(l => {
    if (l.startsWith('en')) {
      return true
    }

    if (l.startsWith('de')) {
      return true
    }
  })

  if (language) {
    language = language.split('-')[0]
  }

  if (['en', 'de'].includes(language)) {
    return language
  }
}

router.post('/login', (req, res, next) => {
  login('ldapauth-user', req, res, err => {
    if (err) {
      return login('ldapauth-customer', req, res, next)
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

    req.login(ldapUser, async loginError => {
      if (loginError) return next(loginError)

      let claims = {
        iss: config.application.name,
        aud: config.application.host,
        uid: users.get(ldapUser).id
      }

      // ldap login to vault
      const { host, ca } = config.services.find(s => s.type === 'vault')
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
      } catch (e) {
        console.log('vault auth error', e)
      }

      req.session.create(claims, (sessionError, token) => {
        if (sessionError) return next(sessionError)

        res.set('Content-Type', 'application/vnd.api+json')
        res.send({ data: { token } })
      })
    })
  })(req, res, next)
}

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})
