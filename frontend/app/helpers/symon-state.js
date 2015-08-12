import Ember from 'ember';

const states = [
  'success',
  'warning',
  'danger'
]

export function symonState(params/*, hash*/) {
  return states[params[0]]
}

export default Ember.Helper.helper(symonState);
