import Mirage, { faker, trait } from 'ember-cli-mirage'

export default Mirage.Factory.extend({
  shortname: 'adsy',
  firstName: faker.name.firstName,
  lastName: faker.name.lastName,
  language: 'en',
  sysupport: 'adsy',
  email() {
    return `${faker.name.firstName()}@${this.shortname}.com`
  },
  emails() {
    let i = faker.random.number({ min: 1, max: 3 })
    let mails = []

    while (i--) {
      mails.push(`${faker.name.firstName()}@${this.shortname}.com`)
    }

    return mails
  },
  admin: trait({
    username: 'admin',
    groups() {
      return ['sysupport', 'adsy-user', 'adsy-vault']
    }
  }),
  customer: trait({
    username: 'customer',
    groups() {
      return [
        `${this.shortname}-vault`,
        `${this.shortname}-sysupport`,
        `test1-gitlab`,
        `test2-gitlab`,
        `test3-gitlab`,
        'adsy-customer'
      ]
    }
  })
})
