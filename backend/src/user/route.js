import { Router } from 'express'
//import User from './user'

const router = new Router
export default router

router.get('/user/current', (req, res) => {
  let user = {
    username:  req.user.get('username'),
    shortname: req.user.get('shortname'),
    email:     req.user.get('email'),
    language:  req.user.get('language'),
    groups:    req.user.getGroups(),
    emails:    req.user.getEmails()
  }

  res.send({ data: { user } })
})

router.put('/user/current', (req, res) => {

})
