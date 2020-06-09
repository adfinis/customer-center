import { helper } from '@ember/component/helper'
import moment from 'moment'

export function momentToDate([date]) {
  return moment(date).toDate()
}

export default helper(momentToDate)
