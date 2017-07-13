import Ember from 'ember'
import { STATE_OK, STATE_WARNING, STATE_ERROR } from 'adsycc/symon/service'
import Service from 'adsycc/symon/service/model'

/**
 * Symon Host model
 *
 * @class Ember.Object
 * @public
 */
export default Ember.Object.extend({
  /**
   * Name of the Host
   *
   * @property {string} name
   * @public
   */
  name: null,

  /**
   * State of the Host
   *
   * @property {integer} state
   * @public
   */
  state: null,

  /**
   * Services running on this Host
   *
   * @property {Array.<Service>} services
   * @public
   */
  services: null,

  /**
   * Host model init function
   *
   * Create Service model objects out of the Host services
   *
   * @return {void}
   * @public
   */
  init() {
    this.set('services', this.get('services').map(s => Service.create(s)))
  },

  /**
   * Computed messages according to the Host and services states
   *
   * @property {Array.<message>} messages
   * @readonly
   * @public
   */
  messages: Ember.computed('state', 'services.@each.state', function() {
    // eslint-disable-next-line new-cap
    let messages = Ember.A()

    if (this.get('state') !== STATE_OK) {
      messages.pushObject({
        text: this.get('name'),
        i18n: 'symon.host.state.danger'
      })
      return messages
    }

    let badServicesMessages = this.get('badServices').map(s => s.get('message'))
    badServicesMessages.forEach(s => messages.pushObject(s))

    return messages
  }),

  /**
   * Computed globalState of the host according to his own and the services states
   *
   * @property {integer} globalState
   * @readonly
   * @public
   */
  globalState: Ember.computed('state', 'services.@each.state', function() {
    if (this.get('state') !== STATE_OK) return STATE_ERROR

    let badServices = this.get('badServices')

    if (!badServices.length) return STATE_OK

    let hasError = badServices.some(s => s.get('ccState') === STATE_ERROR)

    return hasError ? STATE_ERROR : STATE_WARNING
  }),

  /**
   * Computed collection of all Services which have a not ok state
   *
   * @property {Array.<Service>} badServices
   * @readonly
   * @public
   */
  badServices: Ember.computed('services.@each.state', function() {
    return this.get('services').filter(s => s.get('ccState') > STATE_OK)
  })
})
