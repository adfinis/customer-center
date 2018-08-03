import NamespacedJSONAPIMirageSerializer from './model-namespaces'

export default NamespacedJSONAPIMirageSerializer.extend({
  namespace: 'rt',
  include: () => ['owner', 'creator']
})
