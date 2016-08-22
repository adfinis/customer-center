import Ember from 'ember'

export function printProps(props) {
  return Object.keys(props[0])
    .filter(key => key !== 'path')
    .map(key => props[0][key])
    .join(' - ')
}

export default Ember.Helper.helper(printProps)
