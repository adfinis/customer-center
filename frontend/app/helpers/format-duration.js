import Helper from '@ember/component/helper'
import { translationMacro as t } from 'ember-i18n'
import { inject as service } from '@ember/service'
import { observer } from '@ember/object'

const { trunc } = Math

export default Helper.extend({
  i18n: service(),

  hoursCount: 0,
  minutesCount: 0,

  hoursTranslation: t('sysupport.hours', { count: 'hoursCount' }),
  minutesTranslation: t('sysupport.minutes', { count: 'minutesCount' }),

  onLocaleChange: observer(
    'hoursTranslation',
    'minutesTranslation',
    function() {
      this.recompute()
    }
  ),

  compute([duration]) {
    let minutes = duration.minutes()
    let hours = trunc(duration.as('hours'))

    this.set('minutesCount', minutes)
    this.set('hoursCount', hours)

    let hoursS = hours ? `${hours} ${this.get('hoursTranslation')} ` : ''
    let minutesS = minutes ? `${minutes} ${this.get('minutesTranslation')}` : ''

    return hoursS + minutesS
    // if (hours) {
    //   return `${hours} ${this.get('hoursTranslation')} ${minutes} ${this.get(
    //     'minutesTranslation'
    //   )}`
    // } else {
    //   return `${minutes} ${this.get('minutesTranslation')}`
    // }
  }
})
