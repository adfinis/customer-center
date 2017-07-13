import Bookshelf from 'bookshelf'
import knex from 'knex'
import config from '../../config.json'

const { isArray } = Array
const bookshelf = new Bookshelf(knex(config.database))

/**
 * User model
 *
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
      user.set('sysupport', getSySupport(groups))
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

/**
 * Get the sysupport user name
 *
 * @param {Object[]} groups The ldap group objects
 * @return {string|null} The sysupport user name
 */
function getSySupport(groups) {
  let group = groups.find(g => g.cn.endsWith('-sysupport'))
  return group ? group.univentionFreeAttribute1 : null
}
