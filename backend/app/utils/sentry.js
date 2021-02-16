import * as Sentry from '@sentry/node';

export function captureExceptionWithUser(user, fn) {
  Sentry.withScope(function (scope) {
    scope.setTag('user', user.get('username'));
    scope.setTag('email', user.get('email'));
    scope.setExtra('userData', {
      roles: user.getGroupNames(),
      isAdsyUser: user.isAdsyUser(),
      isAdmin: user.isAdmin(),
      isEmployee: user.isEmployee(),
    });

    fn(scope);
  });
}

/*
 * Report an invalid access lookup to sentry for debugging
 */
export function reportInvalidAccess(request, access, route) {
  captureExceptionWithUser(request.user, function (scope) {
    scope.setLevel('info');

    scope.setTag('request', `${request.method} ${request.path}`);
    scope.setExtra('role', access);
    scope.setExtra(
      'request-route-access',
      JSON.stringify(
        Object.assign({}, route, {
          path: route.path.toString(),
        })
      )
    );

    Sentry.captureException(new Error('Access lookup failed'));
  });
}
