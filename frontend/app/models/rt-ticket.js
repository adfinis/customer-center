import attr from 'ember-data/attr'
import Model from 'ember-data/model'
import { belongsTo } from 'ember-data/relationships'

export default Model.extend({
  effectiveid: attr('number'),
  created: attr('django-datetime'),
  updated: attr('django-datetime'),
  subject: attr('string'),
  status: attr('string'),

  creator: belongsTo('rt-user'),
  owner: belongsTo('rt-user')
})
