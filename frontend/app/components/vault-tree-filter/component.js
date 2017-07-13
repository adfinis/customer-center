import Ember from 'ember'

/**
 * Checks if a given value node matches the search term.
 *
 * @param {string} name Name of the node
 * @param {Object} node Object containing the node props like IP, description, ...
 * @param {string} term the search term
 * @return {boolean}
 */
function match(name, node, term) {
  return (
    name.indexOf(term) > -1 ||
    Object.keys(node).some(key => node[key].indexOf(term) > -1)
  )
}

/**
 * Returns if the node or any of its children contains any values.
 *
 * @param {Object} node the tree node
 * @return {boolean}
 */
function isNotEmpty(node) {
  return (
    Object.keys(node.values).length > 0 ||
    Object.keys(node.children).some(name => isNotEmpty(node.children[name]))
  )
}

/**
 * Filter a model by a given term.
 *
 * The model is an object with two properties: "children" and "values"
 * - children: child nodes with the same shape (they also have
 *   "children" and "values"
 * - values: child paths that contain vault secrets and can be clicked
 *
 * @param {Object} model the model object, see above
 * @param {string} term  the search term
 * @return {Object} the filtered model
 */
function deepFilterModel(model, term) {
  const values = Object.keys(model.values)
    .filter(name => match(name, model.values[name], term))
    .reduce((res, key) => {
      res[key] = model.values[key]
      return res
    }, {})

  const children = Object.keys(model.children)
    .map(name => [name, deepFilterModel(model.children[name], term)])
    .filter(([key, filteredChild]) => isNotEmpty(filteredChild))
    .reduce((res, [key, filteredChild]) => {
      res[key] = filteredChild
      return res
    }, {})

  return {
    values,
    children
  }
}

export default Ember.Component.extend({
  search: '',

  didReceiveAttrs() {
    this._super(...arguments)
    this.send('filter')
  },

  actions: {
    filter() {
      const term = this.get('search')
      if (term === '') {
        this.set('tree', this.get('model'))
      } else {
        this.set('tree', deepFilterModel(this.get('model'), term))
      }
    }
  }
})
