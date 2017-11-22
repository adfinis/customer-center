import { helper } from '@ember/component/helper'

export function printProps(props) {
  return Object.keys(props[0])
    .filter(key => key !== 'path')
    .map(key => props[0][key])
    .join(' - ')
}

export default helper(printProps)
