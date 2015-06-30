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

passport.serializeUser((id, done) => done(null, id))
passport.deserializeUser((id, done) => done(null, id))

const router = new express.Router
export default router

router.post('/login', (req, res, next) =>
  passport.authenticate('ldapauth', (err, user, info, status) => {
    if (err)   return next(err)
    if (!user) return next({ status, message: info.message })

    req.login(user, loginError => {
      /* istanbul ignore if */
      if (loginError) return next(loginError)

      res.send({ sessionId: req.sessionID, userId: req.user.id })
    })
  })(req, res, next)
)
