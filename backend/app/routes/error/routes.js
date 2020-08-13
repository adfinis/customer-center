import debug from '../../debug';

/**
 * @see http://expressjs.com/en/guide/error-handling.html
 */
export default function errorRoute(error, request, response, next) {
  let { message: detail, status = 500 } = error;

  if (status === 500) {
    debug.error('Error 500', error);
    detail = 'Internal server error';
  }

  request.session.destroy(() => {
    response.status(status);
    response.send({ errors: [{ status, detail }] });
  });
}
