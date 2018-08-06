import Helper from '@ember/component/helper'
import { translationMacro as t } from 'ember-i18n'
import { inject as service } from '@ember/service'
import { observer } from '@ember/object'
import moment from 'moment'

const { trunc } = Math

export default Helper.extend({
  i18n: service(),

  hoursCount: 0,
  minutesCount: 0,

  hoursTranslation: t('timed.durations.hour', { count: 'hoursCount' }),
  minutesTranslation: t('timed.durations.minute', {
    count: 'minutesCount'
  }),

  onLocaleChange: observer(
    'hoursTranslation',
    'minutesTranslation',
    function() {
      this.recompute()
    }
  ),

  compute([duration]) {
    let hours = trunc(duration.as('hours'))
    // We dont want to show the minutes as minus
    let minutes =
      hours === 0
        ? duration.minutes()
        : moment.duration(Math.abs(duration)).minutes()

    this.set('minutesCount', minutes)
    this.set('hoursCount', hours)
    let hoursString = `${hours} ${this.hoursTranslation}`
    let minutesString = minutes ? `${minutes} ${this.minutesTranslation}` : ''

    return [hoursString, minutesString].filter(str => str).join(' ')
  }
})
