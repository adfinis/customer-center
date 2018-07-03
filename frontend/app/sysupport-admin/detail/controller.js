import Controller from '@ember/controller'
import { inject as service } from '@ember/service'
import { computed } from '@ember/object'
import moment from 'moment'
import { task } from 'ember-concurrency'

export default Controller.extend({
  i18n: service(),

  init() {
    this._super(...arguments)
    this.set('validation', {})
  },

  duration: computed('validation.{hour,minute}', 'hour', 'minute', function() {
    if (this.hour || this.minute) {
      let options = {}

      if (this.hour && this.get('validation.hour')) {
        options.hours = this.hour
      }

      if (this.minute && this.get('validation.minute')) {
        options.minutes = this.minute
      }

      return moment.duration(options)
    } else return null
  }),

  previewDuration: computed('duration', 'preview', function() {
    return (
      this.duration &&
      this.preview &&
      moment.duration(
        this.get('model.project.purchasedTime') +
          this.duration -
          this.get('model.project.spentTime')
      )
    )
  }),

  error: computed('validation.{hour,minute}', function() {
    if (this.hour && this.minute) {
      return !(this.get('validation.hour') && this.get('validation.minute'))
    } else {
      return false
    }
  }),

  orders: computed('fetchOrders.lastSuccessful.value', function() {
    //console.log(this.fetchOrders)
    //console.log('value:', this.get('fetchOrders.lastSuccessful.value'))
    return /*this.get('fetchOrders.lastSuccessful.value') || */ this.get(
      'model.orders'
    )
  }),

  fetchOrders: task(function*() {
    return yield this.store.query('timed-subscription-order', {
      project: this.get('model.project'),
      ordering: '-ordered'
    })
  }).drop(),

  save: task(function*() {
    let order = this.store.createRecord('timed-subscription-order', {
      duration: this.duration,
      acknowledged: true,
      project: this.get('model.project')
    })
    yield order.save()
  }).drop(),

  actions: {
    saveOrder() {
      this.save.perform()
      this.fetchOrders.perform()
    },
    validate(field) {
      if (this.get(field)) {
        if (!Number(this.get(field))) {
          this.set(`validation.${field}`, false)
          this.set(
            'error',
            this.i18n.t(`sysupport.durations.${field}`) +
              ': ' +
              this.i18n.t('sysupport.admin.reload-form-error')
          )
        } else {
          this.set(`validation.${field}`, true)
        }
      }
    }
  }
})
