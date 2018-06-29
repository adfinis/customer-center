import Helper from '@ember/component/helper'
import startPaddingTag from 'customer-center/utils/start-padding-tag'
import moment from 'moment'

const { trunc } = Math

export function formatDurationShort([duration]) {
  //remove "-" from negative numbers
  let negative = duration < 0
  duration = negative ? moment.duration(-duration) : duration
  let str = startPaddingTag(2)`${trunc(
    duration.asHours()
  )}:${duration.minutes()}`
  return negative ? `-${str}` : str
}

export default Helper.helper(formatDurationShort)
