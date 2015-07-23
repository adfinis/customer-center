import express      from 'express'
import passport     from 'passport'
import LdapStrategy from 'passport-ldapauth'
import config       from '../../config.json'

const tlsOptions = { }

if (config.ldap.url.startsWith('ldaps') && config.ldap.cert) {
  tlsOptions.ca = [ require('fs').readFileSync(config.ldap.cert) ]
}

const options = {
  server: Object.assign({}, config.ldap, config.login.ldap, { tlsOptions })
}

passport.use(new LdapStrategy(options))

passport.serializeUser((id, done) => {
  let user = {}

  user.username  = id.uid
  user.shortname = id.sn
  user.groups    = id._groups.map(g => g.cn)
  user.services  = getUserServices(user)

  console.log('Serialized user', user)

  done(null, user)
})
passport.deserializeUser((id, done) => {
  console.log('Deserialized user', id)
  done(null, id)
})

function getUserServices(user) {
  let services = []

  for (let service of config.services) {
    if (!service.ldapGroup) {
      services.push({ type: service.type })
      continue
    }

    let userGroups = user.groups.filter(g =>
      g.endsWith(service.type)
    )

    for (let userGroup of userGroups) {
      let sn = userGroup.split('-')[1]

      services.push({ type: service.type, sn })
    }
  }

  return services
}

const router = new express.Router
export default router

router.post('/login', (req, res, next) =>
  passport.authenticate('ldapauth', (err, user, info, status) => {
    if (err)   return next(err)
    if (!user) return next({ status, message: info.message })

    req.login(user, loginError => {
      /* istanbul ignore if */
      if (loginError) return next(loginError)

      let { user } = req._passport.session
      let claims = {
        iss:    config.application.name,
        aud:    config.application.host,
        user:   { groups: user.groups }
      }

      req.session.create(claims, (sessionError, token) => {
        /* istanbul ignore if */
        if (sessionError) return next(sessionError)

        res.set('Content-Type', 'application/vnd.api+json')
        res.send({ data: { token, user } })
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
