import { module, test } from 'qunit'
import { setupTest } from 'ember-qunit'
import moment from 'moment'

module('Unit | Component | gitlab-projects', function(hooks) {
  setupTest(hooks)

  test('[T10] Calculating commits', async function(assert) {
    let service = this.owner.lookup('service:ajax')
    service.set('resolve', true)
    service.request = () =>
      new Promise((resolve, reject) => {
        service.get('resolve') ? resolve([0, 1, 2, 3, 4]) : reject()
      })
    let component = this.owner.lookup('component:gitlab-projects')
    component.set('commitsSince', moment())
    let numberOfCommits = await component.get('numberOfCommits')
    assert.equal(numberOfCommits, 5)
  })

  test('[T13] Change time span for commits', async function(assert) {
    let service = this.owner.lookup('service:ajax')
    service.request = path => {
      assert.equal(path.split('=')[1], '1995-12-25T00:00:00.000Z')
      return new Promise((resolve, reject) => {
        reject()
      })
    }
    let component = this.owner.lookup('component:gitlab-projects')
    component.set('commitsSince', moment.utc('1995-12-25'))
    let numberOfCommits = await component.get('numberOfCommits')
    assert.equal(numberOfCommits, 0)
  })

  test('[T18] Get latest pipelines', async function(assert) {
    let service = this.owner.lookup('service:ajax')
    service.request = () =>
      new Promise(resolve => {
        resolve({
          pipelines: [
            { flags: { latest: true } },
            { flags: { latest: false } },
            { flags: { latest: true } },
            { flags: { latest: true } }
          ]
        })
      })
    let component = this.owner.lookup('component:gitlab-projects')

    let pipelines = await component.get('pipelines')
    assert.equal(pipelines.length, 3)

    service.request = () =>
      new Promise((resolve, reject) => {
        reject()
      })
    let component2 = this.owner.lookup('component:gitlab-projects')
    let pipelines2 = await component2.get('pipelines')
    assert.equal(pipelines2.length, 0)
  })
})
