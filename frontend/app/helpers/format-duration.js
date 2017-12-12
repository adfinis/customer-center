import Helper from '@ember/component/helper'

export function formatDuration([duration], { format }) {
  console.log(duration.as('hours'))
  return duration.as(format)
}

export default Helper.helper(formatDuration)
