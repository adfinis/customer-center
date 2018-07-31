import Helper from '@ember/component/helper'

export const formatDatetime = ([duration]) => duration.format('h:mm DD.MM.YYYY')

export default Helper.helper(formatDatetime)
