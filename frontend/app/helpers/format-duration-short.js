import Helper from '@ember/component/helper'
import startPaddingTag from 'customer-center/utils/start-padding-tag'

const { trunc } = Math

export function formatDurationShort([duration]) {
  return startPaddingTag(2)`${trunc(
    duration.as('hours')
  )}:${duration.minutes()}`
}

export default Helper.helper(formatDurationShort)
