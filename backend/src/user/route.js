import { Router } from 'express'
import UserSerializer from './serializer'

const router = new Router()
export default router

/**
 * Converts an user bookshelf model for our frontend
 *
 * @param {User} user The bookshelf user model
 * @return {Object}
 */
function userToJSON(user) {
  return {
    id: user.get('id'),
    username: user.get('username'),
    shortname: user.get('shortname'),
    firstName: user.get('firstName'),
    lastName: user.get('lastName'),
    email: user.get('email'),
    language: user.get('language'),
    groups: user.getGroupNames(),
    emails: user.getEmails()
  }
}

router.get('/users/current', (req, res) => {
  res.send(UserSerializer.serialize(userToJSON(req.user)))
})

router.put('/users/current', async (req, res, next) => {
  try {
    req.user.set('language', req.body.data.attributes.language)

    await req.user.save()

    res.send(UserSerializer.serialize(userToJSON(req.user)))
  } catch (e) {
    next(e)
  }
})
