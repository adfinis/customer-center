/*
import app from '../../src/app'
import nock from 'nock'

require('../helper.js')

describe('Test GitLab integration', function() {
  before(async function() {
    let { body: { data: { token } } } = await request(app)
      .post('/api/v1/login')
      .send({
        username: 'customer1',
        password: '123qweasd'
      })
    this.token = token

    nock('http://gitlab:80')
      .persist()
      .matchHeader('private-token', '123qwe')
      .get(/^\/api\/v4\/groups\/(.*)\/$/)
      .reply(200, {
        name: 'g1',
        project: 'p1'
      })
      .get(/^\/(.*)\/.*\/pipelines\.json$/)
      .reply(200, {
        pipeline: 'p1'
      })
      .get(/^\/api\/v4\/projects\/(.*)\%2F.*\/repository\/commits/)
      .reply(200, {
        commit: 'c1'
      })
  })

  it('[T01] Responds to authorized user', async function() {
    let res = await request(app)
      .get('/api/proxy/gitlab/groups/customer1-git1/')
      .set('X-Authorization', this.token)

    expect(res).to.have.status(200)
  })

  it('[T02] Responds to unauthorized user with 404', async function() {
    let { body: { data: { token: token2 } } } = await request(app)
      .post('/api/v1/login')
      .send({
        username: 'customer2',
        password: '123qweasd'
      })

    let res = await request(app)
      .get('/api/proxy/gitlab/groups/customer1-git1/')
      .set('X-Authorization', token2)

    expect(res).to.have.status(404)

    await request(app)
      .post('/api/v1/logout')
      .set('X-Authorization', token2)
  })

  it('[T03] Denies access to unallowed URL with 404', async function() {
    let res = await request(app)
      .get('/api/proxy/gitlab/groups/customer1-git1/projects')
      .set('X-Authorization', this.token)

    expect(res).to.have.status(404)
  })

  it('[T04] Allows Group URL', async function() {
    let res = await request(app)
      .get('/api/proxy/gitlab/groups/customer1-git1/')
      .set('X-Authorization', this.token)

    expect(res).to.have.status(200)
    expect(res).to.have.deep.property('body.name', 'g1')
    expect(res).to.have.deep.property('body.project', 'p1')
  })

  it('[T05] Allows Pipeline URL', async function() {
    let res = await request(app)
      .get('/api/proxy/gitlab/customer1-git1/project-a/pipelines.json')
      .set('X-Authorization', this.token)

    expect(res).to.have.status(200)
    expect(res).to.have.deep.property('body.pipeline', 'p1')
  })

  it('[T06] Allows Commit URL', async function() {
    let res = await request(app)
      .get(
        '/api/proxy/gitlab/projects/customer1-git1%2Fproject-a/repository/commits'
      )
      .set('X-Authorization', this.token)

    expect(res).to.have.status(200)
    expect(res).to.have.deep.property('body.commit', 'c1')

    let res2 = await request(app)
      .get(
        '/api/proxy/gitlab/projects/customer1-git1%2Fproject-a/repository/commits'
      )
      .query({ name: 'foo' })
      .set('X-Authorization', this.token)

    expect(res2).to.have.status(200)
    expect(res2).to.have.deep.property('body.commit', 'c1')
  })

  it('[T07] Appends GitLab Token', async function() {
    let res = await request(app)
      .get('/api/proxy/gitlab/groups/customer1-git1/')
      .set('X-Authorization', this.token)

    expect(res).to.have.status(200)
  })

  after(async function() {
    await request(app)
      .post('/api/v1/logout')
      .set('X-Authorization', this.token)
    nock.cleanAll()
  })
})
*/
