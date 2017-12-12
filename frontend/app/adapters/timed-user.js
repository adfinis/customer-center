import ApplicationAdapter from './application'
import { pluralize } from 'ember-inflector'

export default ApplicationAdapter.extend({
  pathForType(modelName) {
    return pluralize(modelName.replace('timed-', ''))
  }
})
