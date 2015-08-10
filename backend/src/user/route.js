import { Router } from 'express'
//import User from './user/model'

const router = new Router
export default router

/**
 * Converts an user bookshelf model for our frontend
 *
 * @param {User} user The bookshelf user model
 * @return {Object}
 */
function userToJSON(user) {
  return {
    username:  user.get('username'),
    shortname: user.get('shortname'),
    email:     user.get('email'),
    language:  user.get('language'),
    groups:    user.getGroups(),
    emails:    user.getEmails()
  }
}

router.get('/user/current', (req, res) => {
  let user = userToJSON(req.user)

  res.send({ data: { user } })
})

router.put('/user/current', async(req, res, next) => {
  try {
    req.user.set('language', req.body.language)

    await req.user.save()

    let user = userToJSON(req.user)

    res.send({ data: { user } })
  }
  catch (e) {
    next(e)
  }
})
