import Ember from 'ember'
import ENV from 'adsycc/config/environment'

export function serviceEnabled([name]) {
  return ENV.APP.enabledServices.includes(name)
}

export default Ember.Helper.helper(serviceEnabled)
