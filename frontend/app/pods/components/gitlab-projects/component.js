import Component from '@ember/component'
import { inject as service } from '@ember/service'
import { computed } from '@ember/object'

export default Component.extend({
  session: service(),
  notify: service(),
  i18n: service(),
  ajax: service(),

  // Set de tag to `tr` for the generated ember element.
  tagName: 'tr',

  numberOfCommits: computed('project', 'commitsSince', function() {
    return this._getNumberOfCommits().then(commits => commits.length)
  }),

  pipelines: computed('project', function() {
    return this._getPipelines().then(({ pipelines }) =>
      pipelines.filter(pipeline => pipeline.flags.latest)
    )
  }),

  /**
   * Fetch all commits in the specified timerange. The time range is set via the `commitsSince` property.
   *
   * @returns {Object[]} Returns the amount of commits in a specified time range
   * @author Jonas Cosandey <jonas.cosandey@adfinis-sygroup.ch>
   */
  _getNumberOfCommits() {
    let path = encodeURIComponent(this.get('project.path_with_namespace'))
    return this.ajax
      .request(
        `/api/proxy/gitlab/projects/${path}/repository/commits?since=${this.commitsSince.toISOString()}`
      )
      .catch(() => {
        this.notify.warning(
          `${this.i18n.t('gitlab.errors.commits')} ${this.get('project.name')}`
        )
        return []
      })
  },

  /**
   * Fetch all pipelines for a specified project. The project is defined via the `project` property,
   *
   * @returns {Object[]} Return all piplines for a project
   * @author Jonas Cosandey <jonas.cosandey@adfinis-sygroup.ch>
   */
  _getPipelines() {
    return this.ajax
      .request(
        `/api/proxy/gitlab/${this.get(
          'project.path_with_namespace'
        )}/pipelines.json`
      )
      .catch(() => {
        this.notify.warning(
          `${this.i18n.t('gitlab.errors.pipelines')} ${this.get(
            'project.name'
          )}`
        )
        return { pipelines: [] }
      })
  }
})
