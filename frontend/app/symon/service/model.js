import EmberObject, { computed } from '@ember/object'
import { STATE_OK, STATE_WARNING } from 'adsycc/symon/service'

/**
 * Symon Service model
 *
 * @class Ember.Object
 * @public
 */
export default EmberObject.extend({
  init() {
    this._super(...arguments)

    this.set('stateText', [
      'symon.service.state.success',
      'symon.service.state.warning',
      'symon.service.state.danger'
    ])
  },

  /**
   * Name of the Service
   *
   * @property {string} name
   * @public
   */
  name: null,

  /**
   * State of the Service
   *
   * @property {integer} state
   * @public
   */
  state: null,

  /**
   * Computed message according to state of the Service
   *
   * @property {Object} message
   * @readonly
   * @public
   */
  message: computed('state', function() {
    return {
      text: this.get('name'),
      i18n: this.get('stateText')[this.get('ccState')]
    }
  }),

  /**
   * Computed adsycc normalized state of the Service
   *
   * @property {integer} ccState
   * @readonly
   * @public
   */
  ccState: computed('state', function() {
    let state = this.get('state')

    if (state !== STATE_OK && state !== STATE_WARNING) {
      state = 2
    }

    return state
  })
})
