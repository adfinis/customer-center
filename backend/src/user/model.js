import Bookshelf from 'bookshelf'
import knex      from 'knex'
import config    from '../../config.json'

const { isArray } = Array
const bookshelf = new Bookshelf(knex(config.database))

/**
 * User model
 *
 * @class User
 * @public
 */
export default bookshelf.Model.extend({
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
   * Get user ldap groups
   *
   * @return {string[]}
   * @public
   */
  getGroups() {
    let groups = this.get('groups')
    return groups && groups.content
  },

  /**
   * Does this user have redmine access?
   *
   * @return {boolean}
   * @public
   */
  hasRedmineAccess() {
    return this.getGroups().find(g => g.endsWith('redmine'))
  }
}, {
  /**
   * Syncs the ldap user to our database
   *
   * @param {Object} ldap The ldap response with username, shortname and groups
   * @return {Promise.<User>}
   * @public
   */
  async syncLdap(ldap) {
    let user = await new this({ username: ldap.uid }).fetch()

    if (!user) {
      user = new this
    }

    let groups    = isArray(ldap._groups) ? ldap._groups : [ ldap._groups ]
    let companySN = /ou=([^,]+)/.exec(ldap.dn)[1]

    user.set('username',  ldap.uid)
    user.set('shortname', companySN)
    user.set('firstName', ldap.givenName)
    user.set('lastName',  ldap.sn)
    user.set('email',     isArray(ldap.mail) ? ldap.mail[0] : ldap.mail)
    user.set('groups',    { content: groups.map(g => g.cn) })

    if (!user.get('language') && ldap.lang) {
      user.set('language', ldap.lang)
    }

    await user.save()

    return user
  }
})

/*
function getServices(groups) {
  let services = []

  for (let service of config.services) {
    if (!service.ldapGroup) {
      services.push({ type: service.type })
      continue
    }

    let userGroups = groups.filter(g =>
      g.endsWith(service.type)
    )

    for (let userGroup of userGroups) {
      let sn = userGroup.split('-')[0]

      services.push({ type: service.type, sn })
    }
  }

  return services
}
*/
