import ApplicationSerializer from './application'
import { dasherize } from '@ember/string'
import { pluralize } from 'ember-inflector'

export default ApplicationSerializer.extend({
  namespace: null,

  typeKeyForModel(model) {
    return pluralize(
      dasherize(model.modelName)
        .replace(this.namespace, '')
        .replace(/(^-|-$)/g, '')
    )
  }
})
