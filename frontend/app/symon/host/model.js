import Ember from 'ember'
import { STATE_OK, STATE_WARNING, STATE_ERROR } from 'adsycc/symon/service'
import Service from 'adsycc/symon/service/model'

export default Ember.Object.extend({
  name:  null,
  state: null,
  services: null,

  init() {
    this.set('services', this.get('services').map(s => Service.create(s)))
  },

  messages: Ember.computed('state', 'services.@each.state', function() {
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

  globalState: Ember.computed('state', 'services.@each.state', function() {
    if (this.get('state') !== STATE_OK) return STATE_ERROR

    let badServices = this.get('badServices')

    if (!badServices.length) return STATE_OK

    let hasError = badServices.some(s => s.get('ccState') === STATE_ERROR)

    return hasError ? STATE_ERROR : STATE_WARNING
  }),

  badServices: Ember.computed('services.@each.state', function() {
    return this.get('services').filter(s =>
      s.get('ccState') > STATE_OK
    )
  })
});
