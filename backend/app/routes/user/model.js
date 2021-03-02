import Bookshelf from 'bookshelf';

import debug from '../../debug';
import config from '../../convict';
import database from '../../knex';

const bookshelf = new Bookshelf(database);

/**
 * User model *
 * @class User
 * @public
 */
export default bookshelf.model(
  'User',
  {
    tableName: 'user',

    /**
     * Get user mail addresses
     *
     * @return {string[]}
     * @public
     */
    getEmails() {
      let emails = this.get('emails');
      return emails && emails.content;
    },

    /**
     * Get user ldap group objects
     *
     * @return {Object[]} ldap group objects
     * @public
     */
    getGroups() {
      let groups = this.get('groups');
      return groups && groups.content;
    },

    /**
     * Get user ldap group names
     *
     * @return {string[]}
     * @public
     */
    getGroupNames() {
      let groups = this.get('groups');
      return groups && groups.content.map((g) => g.cn);
    },

    /**
     * Return all groups with a `-gitlab` suffix
     *
     * @returns {String[]} All gitlab groups from this user
     * @author Jonas Cosandey <jonas.cosandey@adfinis-sygroup.ch>
     */
    getGitlabGroups() {
      return this.getGroupNames()
        .filter((group) => group.endsWith('-gitlab'))
        .map((group) => group.replace('-gitlab', ''));
    },

    /**
     * Check if user is Admin
     *
     * @returns {boolean}
     * @public
     * @author Jonas Cosandey <jonas.cosandey@adfinis-sygroup.ch>
     */
    isAdmin() {
      return this.getGroupNames().includes(config.get('auth.adminRole'));
    },

    /**
     * Check if user is employee
     *
     * @returns {boolean}
     * @public
     * @author Jonas Cosandey <jonas.cosandey@adfinis-sygroup.ch>
     */
    isAdsyUser() {
      return this.getGroupNames().includes(config.get('auth.employeeRole'));
    },

    /**
     * Is user a adsy user
     *
     * @returns {boolean}
     * @public
     * @author Jonas Cosandey <jonas.cosandey@adfinis-sygroup.ch>
     */
    isEmployee() {
      return this.isAdmin() || this.isAdsyUser();
    },

    /**
     * Does this user have redmine access?
     *
     * @return {boolean}
     * @public
     */
    hasRedmineAccess() {
      return this.getGroupNames().find((g) => g.endsWith('redmine'));
    },
  },
  {
    /**
     * Syncs the ldap user to our database
     *
     * @param {Object} ldap The ldap response with username, shortname and groups
     * @return {Promise.<User>}
     * @public
     */
    async syncLdap(ldap) {
      let User = bookshelf.model('User');
      let user = await new User({ username: ldap.uid }).fetch({
        require: false,
      });

      if (!user) {
        user = new User();
      }

      let groups = getGroups(ldap);
      let companySN = /ou=([^,]+)/.exec(ldap.dn);

      user.set('username', ldap.uid);
      user.set('shortname', companySN ? companySN[1] : null);
      user.set('firstName', ldap.givenName);
      user.set('lastName', ldap.sn);
      user.set('email', getEmail(ldap));
      user.set('groups', { content: groups });

      if (!user.get('language') && ldap.lang) {
        user.set('language', ldap.lang);
      }

      await user.save();

      return user;
    },
  }
);

/**
 * Get email from ldap object, returns the first one if multiple are available
 *
 * @param {Object} ldap The ldap response object
 * @return {string|null} The email address
 */
function getEmail(ldap) {
  return Array.isArray(ldap.mail) ? ldap.mail[0] : ldap.mail || null;
}

/**
 * Extract groups from ldap object
 *
 * @param {Object} ldap The ldap response object
 * @return {Object[]} The ldap group objects
 */
function getGroups(ldap) {
  return Array.isArray(ldap._groups)
    ? ldap._groups
    : ldap._groups && [ldap._groups];
}
