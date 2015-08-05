import express      from 'express'
import passport     from 'passport'
import LdapStrategy from 'passport-ldapauth'
import User         from '../user/model'
import config       from '../config'

passport.use(new LdapStrategy({
  server: Object.assign({}, config.ldap, config.login.ldap)
}))

passport.serializeUser(async(ldap, done) => {
  try {
    await User.syncLdap(ldap)
    done(null, ldap.uid)
  }
  catch (e) {
    done(e)
  }
})
passport.deserializeUser(async(uid, done) => {
  try {
    let user = await new User({ username: uid }).fetch({ required: true })

    done(null, user)
  }
  catch (e) {
    done(e)
  }
})

const router = new express.Router
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
  let language  = languages.find(l => {
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

  if ([ 'en', 'de' ].includes(language)) {
    return language
  }
}

router.post('/login', (req, res, next) =>
  passport.authenticate('ldapauth', (err, ldapUser, info, status) => {
    if (err)       return next(err)
    if (!ldapUser) return next({ status, message: info.message })

    if (!ldapUser.lang && req.headers['accept-language']) {
      ldapUser.lang = getLanguage(req.headers['accept-language'])
    }

    req.login(ldapUser, loginError => {
      /* istanbul ignore if */
      if (loginError) return next(loginError)

      let claims = {
        iss:  config.application.name,
        aud:  config.application.host,
        user: { username: ldapUser.uid }
      }

      req.session.create(claims, (sessionError, token) => {
        /* istanbul ignore if */
        if (sessionError) return next(sessionError)

        res.set('Content-Type', 'application/vnd.api+json')
        res.send({ data: { token } })
      })
    })
  })(req, res, next)
)

router.get('/logout', logout)
      .post('/logout', logout)

function logout(req, res) {
  req.logout()
  res.redirect('/login')
}
