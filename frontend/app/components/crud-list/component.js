import Ember from 'ember'

function external(internalModel) {
  return internalModel.reduce((prev, curr) => {
    prev[curr.key] = curr.value
    if (curr.comment) {
      prev[`${curr.key}_comment`] = curr.comment
    }
    return prev
  }, {})
}

function internal(model) {
  return !model
    ? null
    : Object.keys(model)
        .map(key => {
          return Ember.Object.create({
            key,
            value: model[key],
            edit: false
          })
        })
        .reduce((prev, curr) => {
          if (curr.key.endsWith('_comment')) {
            prev[prev.length - 1].comment = curr.value
            return prev
          }
          return [...prev, curr]
        }, [])
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

    async save(index, { key, value, comment }) {
      this.get('_model').replace(index, 1, [
        Ember.Object.create({ key, value, comment, edit: false })
      ])
      await this.get('onUpdate')(external(this.get('_model')))
    },

    edit(index) {
      this.get(`_model.${index}`).set('edit', true)
    },

    async delete(index) {
      this.get('_model').removeAt(index)
      await this.get('onUpdate')(external(this.get('_model')))
    }
  }
})
