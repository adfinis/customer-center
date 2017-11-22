import { helper } from '@ember/component/helper'
import ENV from 'adsycc/config/environment'

export function serviceEnabled([name]) {
  return ENV.APP.enabledServices.includes(name)
}

export default helper(serviceEnabled)
