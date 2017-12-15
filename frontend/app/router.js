import EmberRouter from '@ember/routing/router'
import config from './config/environment'

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function() {
  this.route('login', function() {
    this.route('password-reset')
    this.route('new-password', { path: '/new-password/:token' })
  })

  this.route('protected', { path: '/' }, function() {
    this.route('index', { path: '/', resetNamespace: true })

    this.route('vault', { resetNamespace: true }, function() {
      this.route('edit', { path: '/*path' })
    })

    this.route(
      'sysupport',
      { resetNamespace: true, path: 'sysupport/projects' },
      function() {
        this.route('detail', { path: ':project_id/detail' })
        this.route('reload', { path: ':project_id/reload' })
      }
    )
  })

  this.route('notfound', { path: '/*path' })
})

export default Router
