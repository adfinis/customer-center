import Component from '@ember/component'
import { computed } from '@ember/object'

export default Component.extend({
  /**
   * Get the Projects filtered based on the `filter` property.
   *
   * @returns {Object[]} Returns the filtered Project
   **/
  projects: computed('filter', 'model', function() {
    let search = this.get('filter.search')
    if (search && search.trim() !== '') {
      // Get projects which match the filter
      return this.get('model.projects').filter(project =>
        project.name.toLowerCase().includes(search.trim().toLowerCase())
      )
    }
    return this.get('model.projects')
  })
})
