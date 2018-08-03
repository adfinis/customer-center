import attr from 'ember-data/attr'
import Model from 'ember-data/model'

export default Model.extend({
  username: attr('string'),
  fullName: attr('string'),
  email: attr('string')
})
