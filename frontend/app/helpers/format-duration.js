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

    let hoursString = hours ? `${hours} ${this.get('hoursTranslation')} ` : ''
    let minutesString = minutes
      ? `${minutes} ${this.get('minutesTranslation')}`
      : ''

    return [hoursString, minutesString].filter(str => str).join(' ')
  }
})
