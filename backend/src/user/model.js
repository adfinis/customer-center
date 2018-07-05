import Bookshelf from 'bookshelf'
import knex from 'knex'
import config from './../config'

const { isArray } = Array
const bookshelf = new Bookshelf(knex(config.database))

/**
 * User model *
 * @class User
 * @public
 */
export default bookshelf.Model.extend(
  {
    tableName: 'user',

    /**
     * Get user mail addresses
     *
     * @return {string[]}
     * @public
     */
    getEmails() {
      let emails = this.get('emails')
      return emails && emails.content
    },

    /**
     * Get user ldap group objects
     *
     * @return {Object[]} ldap group objects
     * @public
     */
    getGroups() {
      let groups = this.get('groups')
      return groups && groups.content
    },

    /**
     * Get user ldap group names
     *
     * @return {string[]}
     * @public
     */
    getGroupNames() {
      let groups = this.get('groups')
      return groups && groups.content.map(g => g.cn)
    },

    /**
     * Return all groups with a `-gitlab` suffix
     *
     * @returns {String[]} All gitlab groups from this user
     * @author Jonas Cosandey (jonas.cosandey@adfinis-sygroup.ch)
     */
    getGitlabGroups() {
      return this.getGroupNames()
        .filter(group => group.endsWith('-gitlab'))
        .map(group => group.replace('-gitlab', ''))
    },

    /**
     * Check if user is Admin
     *
     * @returns {boolean}
     * @public
     * @author Jonas Cosandey (jonas.cosandey@adfinis-sygroup.ch)
     */
    isAdmin() {
      return this.getGroupNames().includes(config.login.adminRole)
    },

    /**
     * Check if user is inter
     *
     * @returns {boolean}
     * @public
     * @author Jonas Cosandey (jonas.cosandey@adfinis-sygroup.ch)
     */
    isAdsyUser() {
      return this.getGroupNames().includes(config.login.internRole)
    },

    /**
     * Does this user have redmine access?
     *
     * @return {boolean}
     * @public
     */
    hasRedmineAccess() {
      return this.getGroupNames().find(g => g.endsWith('redmine'))
    }
  },
  {
    /**
     * Syncs the ldap user to our database
     *
     * @param {Object} ldap The ldap response with username, shortname and groups
     * @return {Promise.<User>}
     * @public
     */
    // eslint-disable-next-line max-statements
    async syncLdap(ldap) {
      let user = await new this({ username: ldap.uid }).fetch()

      if (!user) {
        user = new this()
      }

      let groups = getGroups(ldap)
      let companySN = /ou=([^,]+)/.exec(ldap.dn)

      user.set('username', ldap.uid)
      user.set('shortname', companySN ? companySN[1] : null)
      user.set('firstName', ldap.givenName)
      user.set('lastName', ldap.sn)
      user.set('email', getEmail(ldap))
      user.set('groups', { content: groups })

      if (!user.get('language') && ldap.lang) {
        user.set('language', ldap.lang)
      }

      await user.save()

      return user
    }
  }
)

/**
 * Get email from ldap object, returns the first one if multiple are available
 *
 * @param {Object} ldap The ldap response object
 * @return {string|null} The email address
 */
function getEmail(ldap) {
  return isArray(ldap.mail) ? ldap.mail[0] : ldap.mail || null
}

/**
 * Extract groups from ldap object
 *
 * @param {Object} ldap The ldap response object
 * @return {Object[]} The ldap group objects
 */
function getGroups(ldap) {
  return isArray(ldap._groups) ? ldap._groups : ldap._groups && [ldap._groups]
}
