import Component from '@ember/component'
import { inject } from '@ember/service'
import { computed, observer } from '@ember/object'
import config from '../../config/environment'

/**
 * Request Tracker list component
 *
 * @class RTList
 * @public
 */
export default Component.extend({
  /**
   * The request tracker host name
   *
   * @property {string} host
   * @public
   */
  host: config.APP.rt.host,

  /**
   * The mail handling the request tracker
   *
   * @property {string} mail
   * @public
   */
  mail: config.APP.rt.mail,

  /**
   * RT service to fetch rt issues
   *
   * @property {RTService} rt
   * @public
   */
  rt: inject(),

  /**
   * Limit rt issues
   *
   * @property {number} limit
   * @public
   */
  limit: 10,

  /**
   * RT issue offset
   *
   * @property {number} offset
   * @public
   */
  offset: 0,

  /**
   * RT issue total
   *
   * @property {number} total
   * @public
   */
  total: 0,

  /**
   * Mark component as loading
   *
   * @property {boolean} loading
   * @public
   */
  loading: false,

  /**
   * The current page displayed
   *
   * @property {number} page
   * @public
   */
  page: computed('limit', 'offset', {
    get() {
      return Math.max(1, this.get('offset') / this.get('limit'))
    },
    set(key, value) {
      this.set('offset', this.get('limit') * (value - 1))

      return value
    }
  }),

  /**
   * The total pages of issues available
   *
   * @property {number} totalPages
   * @readOnly
   * @public
   */
  totalPages: computed('limit', 'total', function() {
    return Math.ceil(this.get('total') / this.get('limit'))
  }),

  /**
   * Should there be a pager?
   *
   * @property {boolean} showPager
   * @readOnly
   * @private
   */
  showPager: computed('totalPages', function() {
    return this.get('totalPages') > 1
  }),

  /**
   * Update the model of this component, refetches new rt issues
   *
   * @todo   Trigger on email change (caused some heave retriggering of the observer..)
   * @return {void}
   * @private
   */
  updateTickets: observer('limit', 'offset', function() {
    this.send('updateModel')
  }),

  /**
   * RTComponent actions
   *
   * @property {Object} actions
   */
  actions: {
    /**
     * Update model action, fetches new issues from rt
     *
     * @return {void}
     */
    async updateModel() {
      this.set('error', null)
      this.set('loading', true)

      try {
        let rt = this.get('rt')
        let params = {
          limit: this.get('limit'),
          offset: this.get('offset'),
          emails: this.get('emails')
        }

        let { issues, total } = await rt.fetchIssues(params)
        this.set('issues', issues)
        this.set('total', total)
      } catch (e) {
        this.set('error', e)
      } finally {
        this.set('loading', false)
      }
    }
  }
})
