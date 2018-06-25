import { helper } from '@ember/component/helper'
import ENV from 'customer-center/config/environment'

export function serviceEnabled([service]) {
  return ENV.APP.enabledServices && ENV.APP.enabledServices.includes(service)
}

export default helper(serviceEnabled)
