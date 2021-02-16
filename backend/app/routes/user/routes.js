import { Router } from 'express';
import UserSerializer from './serializer';

const router = new Router();
export default router;

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
    emails: user.getEmails(),
  };
}

router.get('/users/current', (request, response) => {
  response.send(UserSerializer.serialize(userToJSON(request.user)));
});

router.put('/users/current', async (request, response, next) => {
  try {
    request.user.set('language', request.body.data.attributes.language);

    await request.user.save();

    response.send(UserSerializer.serialize(userToJSON(request.user)));
  } catch (error) {
    next(error);
  }
});
