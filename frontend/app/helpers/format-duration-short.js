import Helper from '@ember/component/helper'
import { padStartTpl } from 'ember-pad/utils/pad'

const { trunc } = Math

export function formatDurationShort([duration]) {
  return padStartTpl(2)`${trunc(duration.as('hours'))}:${duration.minutes()}`
}

export default Helper.helper(formatDurationShort)
