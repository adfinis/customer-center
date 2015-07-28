import express      from 'express'
import passport     from 'passport'
import LdapStrategy from 'passport-ldapauth'
import User         from '../user/model'
import config       from '../../config.json'

const tlsOptions = { }

if (config.ldap.url.startsWith('ldaps') && config.ldap.cert) {
  tlsOptions.ca = [ require('fs').readFileSync(config.ldap.cert) ]
}

const options = {
  server: Object.assign({}, config.ldap, config.login.ldap, { tlsOptions })
}

passport.use(new LdapStrategy(options))

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

router.post('/login', (req, res, next) =>
  passport.authenticate('ldapauth', (err, ldapUser, info, status) => {
    if (err)       return next(err)
    if (!ldapUser) return next({ status, message: info.message })

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
