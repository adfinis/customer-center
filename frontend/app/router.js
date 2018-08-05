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
    this.route('dashboard', { path: '/', resetNamespace: true })

    this.route('vault', { resetNamespace: true }, function() {
      this.route('edit', { path: '/*path' })
    })
    this.route('timed-subscriptions', { resetNamespace: true }, function() {
      this.route('detail', { path: ':project_id' }, function() {
        this.route('reload')
      })
    })
    this.route('timed-admin', { resetNamespace: true }, function() {
      this.route('detail', { path: ':project' })
      this.route('confirm-subscriptions')
    })

    this.route('gitlab', { resetNamespace: true, path: 'projects' })
    this.route('rt', { resetNamespace: true, path: 'tickets' })
  })

  this.route('notfound', { path: '/*path' })
})

export default Router
