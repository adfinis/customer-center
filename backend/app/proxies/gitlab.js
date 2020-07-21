import httpProxy from 'express-http-proxy';
import path from 'path';

const routes = {
  group: /^\/groups\/(.*)\/$/,
  pipelines: /^\/(.*)\/.*\/pipelines\.json$/,
  commits: /^\/projects\/(.*)%2F.*\/repository\/commits$/
};

/**
 * Create a proxy for gitlab
 *
 * @param {Object} config The confiuration for the gitlab rpoxy
 * @returns {Object} Returns the configured proxy for gitlab
 * @author Jonas Cosandey <jonas.cosandey@adfinis-sygroup.ch>
 */
export default function createProxy(config) {
  return httpProxy(config.host, {
    /**
     * Define if the body of the request should be parsed or ignored.
     * We use it to prevent any requests which are not of type `GET`.
     *
     * @type Boolean
     * @author Jonas Cosandey <jonas.cosandey@adfinis-sygroup.ch>
     */
    parseReqBody: false,

    /**
     * Filter the request according to their path.
     * If their path matches none of the ones defined in `routes` or the HTTP method is not `GET` they get rejected.
     *
     * @param {Object} request The request to validate
     * @returns {Boolean} Return `true` to let the request pass and `false` to deny the request.
     * @author Jonas Cosandey <jonas.cosandey@adfinis-sygroup.ch>
     */
    filter(request) {
      let namespace = Object.keys(routes)
        .map(key => {
          let match = request.path.match(routes[key]);

          // The fisrt element in the `match` array is the captured regex group.
          return match ? match[1] : null;
        })
        .find(result => result);

      return (
        request.method === 'GET' &&
        request.user.getGitlabGroups().some(group => {
          return group === namespace;
        })
      );
    },

    /**
     * Define the path on which the request should be proxied.
     * If it is the `pipelines` route, we dont want to prefix the path with the API namespace since this
     * is not a API request.
     *
     * @param {Object} request The request to validate
     * @returns {String} Returns the new path.
     * @author Jonas Cosandey <jonas.cosandey@adfinis-sygroup.ch>
     */
    proxyReqPathResolver(request) {
      let queryString = Object.keys(request.query)
        .map(key => `${key}=${request.query[key]}`)
        .join('&');

      if (request.path.match(routes.pipelines)) {
        return request.path;
      }

      if (queryString) {
        return `${path.join(config.prefix, request.path)}?${queryString}`;
      }

      return path.join(config.prefix, request.path);
    },

    /**
     * Append the gitlab token to the options for the new request.
     *
     * @param {Object} proxyReqOpts The options of the new request
     * @returns {Object} Returns the propperty object for the new request.
     *
     */
    proxyReqOptDecorator(proxyReqOpts) {
      proxyReqOpts.headers['private-token'] = config.token;
      return proxyReqOpts;
    }
  });
}
