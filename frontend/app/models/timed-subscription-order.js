import attr from 'ember-data/attr'
import Model from 'ember-data/model'
import { belongsTo } from 'ember-data/relationships'

export default Model.extend({
  duration: attr('django-duration'),
  acknowledged: attr('boolean', { defaultValue: false }),
  ordered: attr('django-date'),
  project: belongsTo('timed-subscription-project')
})
