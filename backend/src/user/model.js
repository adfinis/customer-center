import Bookshelf from 'bookshelf'
import knex      from 'knex'
import config    from '../../config.json'

let bookshelf = new Bookshelf(knex(config.database))

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
   * @return {User}
   * @public
   */
  async syncLdap(ldap) {
    let user = await new this({ username: ldap.uid }).fetch()

    if (!user) {
      user = new this
    }

    user.set('username',  ldap.uid)
    user.set('shortname', ldap.sn)
    user.set('groups',    { content: ldap._groups.map(g => g.cn) })
    user.set('emails',    { content: [ 'info@example.com', 'root@localhost' ] })

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
