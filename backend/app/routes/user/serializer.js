import { Serializer as JSONAPISerializer } from 'jsonapi-serializer';

export default new JSONAPISerializer('users', {
  attributes: [
    'username',
    'shortname',
    'firstName',
    'lastName',
    'email',
    'language',
    'groups',
    'emails'
  ]
});
