import DS from 'ember-data'
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin'

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorize(xhr) {
    if (this.get('session.data.authenticated.data.token')) {
      xhr.setRequestHeader(
        'X-Authorization',
        this.get('session.data.authenticated.data.token')
      )
    }
  }
})
