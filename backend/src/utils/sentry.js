import * as Sentry from '@sentry/node'

export function captureExceptionWithUser(user, fn) {
  Sentry.withScope(function(scope) {
    scope.setTag('username', user.get('username'))
    scope.setExtra('user', {
      email: user.get('email'),
      roles: user.getGroupNames(),
      isAdsyUser: user.isAdsyUser(),
      isAdmin: user.isAdmin(),
      isEmployee: user.isEmployee()
    })

    fn(scope)
  })
}

export default captureExceptionWithUser
