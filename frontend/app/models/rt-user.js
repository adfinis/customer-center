import attr from 'ember-data/attr'
import Model from 'ember-data/model'
//import { hasMany } from '@ember/relationships'

export default Model.extend({
  username: attr('string'),
  fullName: attr('string'),
  email: attr('string')

  //maybe i dont need this:
  //tickets: hasMany('rt-ticket')
})
