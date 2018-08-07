import Mirage, { faker, trait } from 'ember-cli-mirage'

export default Mirage.Factory.extend({
  shortname: 'adsy',
  firstName: faker.name.firstName,
  lastName: faker.name.lastName,
  language: 'en',
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
      return ['timed', 'adsy-timed-admin', 'vault', 'rt']
    }
  }),
  employee: trait({
    username: 'employee',
    groups() {
      return ['timed', 'adsy-user', 'vault', 'rt']
    }
  }),
  customer: trait({
    username: 'customer',
    groups() {
      return [
        `${this.shortname}-vault`,
        `${this.shortname}-timed`,
        `${this.shortname}-rt`,
        `test1-gitlab`,
        `test2-gitlab`,
        `test3-gitlab`,
        'adsy-customer'
      ]
    }
  })
})
