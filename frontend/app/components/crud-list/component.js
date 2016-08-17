import Ember from 'ember'

function external(internalModel) {
  return internalModel.reduce((prev, curr) => {
    prev[curr.key] = curr.value
    return prev
  }, {})
}

function internal(model) {
  return Object.keys(model).map(key => {
    return {
      key,
      value: model[key],
      edit: false
    }
  })
}

export default Ember.Component.extend({
  didReceiveAttrs() {
    this._super(...arguments)
    this.set('_model', internal(this.get('model')))
  },

  actions: {
    add() {
      this.get('_model').pushObject({ edit: true })
    },

    async save(index, { key, value }) {
      this.get('_model').replace(index, 1, [{ key, value, edit: false }])
      await this.get('onUpdate')(external(this.get('_model')))
    },

    edit(index) {
      Ember.set(this.get('_model').get(index), 'edit', true)
    },

    async delete(index) {
      this.get('_model').removeAt(index)
      await this.get('onUpdate')(external(this.get('_model')))
    }
  }
})
