import Mirage, { faker } from 'ember-cli-mirage'

export default Mirage.Factory.extend({
  shortname: 'adsy',
  username: function() {
    return `${this.shortname}-${faker.name.firstName()}`
  },
  email: function() {
    return `${faker.name.firstName()}@${this.shortname}.com`
  },
  groups: function() {
    return [
      `${this.shortname}-redmine`,
      `${this.shortname}-mon`,
      `${this.shortname}-rt`,
      `${this.shortname}-timed`,
      `${this.shortname}-wiki`
    ]
  },
  emails: function() {
    let i     = faker.random.number({ min: 1, max: 3 })
    let mails = []

    while (i--) {
      mails.push(`${faker.name.firstName()}@${this.shortname}.com`)
    }

    return mails
  }
})
