import attr from 'ember-data/attr'
import Model from 'ember-data/model'
import { hasMany } from 'ember-data/relationships'

export default Model.extend({
  name: attr('string'),
  projects: hasMany('timed-subscription-project'),
  packages: hasMany('timed-subscription-packages')
})
