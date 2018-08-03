import NamespacedJSONAPISerializer from 'ember-model-namespaces/serializers/serializer'

export default NamespacedJSONAPISerializer.extend({
  namespace: 'rt',

  attrs: {
    updated: 'last-updated'
  }
})
