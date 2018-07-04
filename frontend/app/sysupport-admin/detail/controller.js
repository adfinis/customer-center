import Controller from '@ember/controller'
import { computed } from '@ember/object'
import { inject as service } from '@ember/service'

import { task } from 'ember-concurrency'
import moment from 'moment'
import UIkit from 'UIkit'

export default Controller.extend({
  i18n: service(),
  notify: service(),

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

  error: computed('validation.{hour,minute}', 'hour', 'minute', function() {
    if (
      (this.hour && !this.get('validation.hour')) ||
      (this.minute && !this.get('validation.minute'))
    ) {
      return true
    } else {
      return false
    }
  }),

  orders: computed('fetchOrders.lastSuccessful.value', function() {
    return (
      this.get('fetchOrders.lastSuccessful.value') || this.get('model.orders')
    )
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

  validation: computed('hour', 'minute', function() {
    let validation = {
      hour: Boolean(Number(this.hour)),
      minute: Boolean(Number(this.minute))
    }

    if (validation.hour && validation.minute) {
      this.set('preview', true)
    }

    return validation
  }),

  fetchOrders: task(function*() {
    try {
      return yield this.store.query('timed-subscription-order', {
        project: this.get('model.project.id'),
        ordering: '-ordered'
      })
    } catch (e) {
      this.notify.error(this.i18n.t('sysupport.reload.error-loading'))
    }
  }).drop(),

  save: task(function*() {
    try {
      let order = this.store.createRecord('timed-subscription-order', {
        duration: this.duration,
        acknowledged: true,
        project: this.get('model.project')
      })
      yield order.save()

      this.notify.success(this.i18n.t('sysupport.reload.success'))
      UIkit.accordion('[data-reload-acc]').toggle()
      this.setProperties({ hour: null, minute: null })
    } catch (e) {
      this.notify.error(this.i18n.t('sysupport.reload.error'))
    } finally {
      this.fetchOrders.perform()
    }
  }).drop(),

  actions: {
    saveOrder() {
      this.save.perform()
    }
  }
})
