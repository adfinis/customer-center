import Ember from 'ember'

const defaultLength = 40

export function trim([text], { length = defaultLength }) {
  return text.length <= length ? text : `${text.substring(0, length)}...`
}

export default Ember.Helper.helper(trim)
