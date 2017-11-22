import { helper } from '@ember/component/helper'

const states = ['success', 'warning', 'danger']

export function symonState(params /*, hash*/) {
  return states[params[0]]
}

export default helper(symonState)
