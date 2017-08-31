import Ember from 'ember'

export default Ember.Route.extend({
  model() {
    return {
      list: [
        {
          customer: 'Muster customer 123',
          projectName: 'SLA Störungsbehebung',
          packageType: 'Software Maintenance Abo',
          timeBooked: '100',
          timeUsed: '50',
          timeRemaining: '50'
        },
        {
          customer: 'Muster customer 123',
          projectName: 'SLA Störungsbehebung',
          packageType: 'Software Maintenance Abo',
          timeBooked: '100',
          timeUsed: '50',
          timeRemaining: '50'
        },
        {
          customer: 'Muster customer 123',
          projectName: 'SLA Störungsbehebung',
          packageType: 'Software Maintenance Abo',
          timeBooked: '100',
          timeUsed: '50',
          timeRemaining: '50'
        },
        {
          customer: 'Muster customer 123',
          projectName: 'SLA Störungsbehebung',
          packageType: 'Software Maintenance Abo',
          timeBooked: '100',
          timeUsed: '90',
          timeRemaining: '10'
        }
      ],
      confirm: [
        {
          customer: 'Muster customer 123',
          projectName: 'SLA Störungsbehebung',
          leaseTime: '50',
          leaseStamp: '2017-01-17 00:00:00+02'
        },
        {
          customer: 'Muster customer 123',
          projectName: 'SLA Störungsbehebung',
          leaseTime: '66',
          leaseStamp: '2016-01-17 00:00:00+02'
        },
        {
          customer: 'Muster customer 123',
          projectName: 'SLA Störungsbehebung',
          leaseTime: '55',
          leaseStamp: '2015-01-17 00:00:00+02'
        }
      ]
    }
  }
})
