import Ember from 'ember'
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
    
    if (this.get('state') !== 0) {
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
    if (this.get('state') !== 0) { return 2 }

    let badServices = this.get('badServices')

    if (!badServices.length) { return 0 }

    let hasError = badServices.some(s => s.get('ccState') === 2)

    return hasError ? 2 : 1
  }),

  badServices: Ember.computed('services.@each.state', function() {
    return this.get('services').filter(s =>
      s.get('ccState') > 0
    )
  })
});
