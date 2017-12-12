import ApplicationSerializer from './application'
import { singularize, pluralize } from 'ember-inflector'

export default ApplicationSerializer.extend({
  payloadTypeFromModelName(name) {
    console.log(name)
    return pluralize(name.replace('timed-', ''))
  },

  modelNameFromPayloadType(payloadKey) {
    console.log(`timed-${singularize(payloadKey)}`)
    return `timed-${singularize(payloadKey)}`
  }
})
