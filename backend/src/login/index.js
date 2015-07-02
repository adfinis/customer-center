import fs           from 'fs'
import express      from 'express'
import passport     from 'passport'
import LdapStrategy from 'passport-ldapauth'
import config       from '../../config.json'

const options = {
  server: Object.assign({}, config.ldap, config.login.ldap, {
    // tlsOptions: {
    //   ca: [
    //     fs.readFileSync('/path/to/root_ca_cert.crt')
    //   ]
    // }
  })
}

passport.use(new LdapStrategy(options))

passport.serializeUser((id, done) => {
  console.log('serializing', id)
  done(null, id)
})
passport.deserializeUser((id, done) => {
  console.log('deserializing', id)
  done(null, id)
})

const router = new express.Router
export default router

router.post('/login', (req, res, next) =>
  passport.authenticate('ldapauth', (err, user, info, status) => {
    if (err)   return next(err)
    if (!user) return next({ status, message: info.message })

    req.login(user, loginError => {
      /* istanbul ignore if */
      if (loginError) return next(loginError)

      let claims = {
        iss: config.application.name,
        aud: config.application.host
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
