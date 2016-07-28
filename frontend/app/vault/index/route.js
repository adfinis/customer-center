import Ember from 'ember'

export default Ember.Route.extend({
  model() {
    const dummyData = {
      systems: [
        'vm-customer-1.tld',
        'vm-customer-1.tld'
      ],
      firewalls: [
        'ieu04-fw01.sn-adm.iet-gibb.ch',
        'ieu04-fw02.sn-adm.iet-gibb.ch',
        'ieu04-fw03.sn-adm.iet-gibb.ch'
      ]
    }
    return dummyData
  }
})
