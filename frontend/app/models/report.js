import attr from 'ember-data/attr'
import Model from 'ember-data/model'
import { belongsTo } from 'ember-data/relationships'

export default Model.extend({
  comment: attr('string'),
  date: attr('django-date'),
  duration: attr('django-duration'),
  timedUser: belongsTo('timed-user')
})
