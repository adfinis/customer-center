import Ember from 'ember';

export default Ember.Object.extend({
  name: null,
  state: null,
  stateText: [
    'symon.service.state.success',
    'symon.service.state.warning',
    'symon.service.state.danger'
  ],

  message: Ember.computed('state', function() {
    return {
      text: this.get('name'),
      i18n: this.get('stateText')[this.getNormalizedState()]
    }
  }),

  ccState: Ember.computed('state', function() {
    return this.getNormalizedState()
  }),

  getNormalizedState() {
    let state = this.get('state')

    if (state < 0 || state > 1) {
      state = 2
    }

    return state
  }
});
