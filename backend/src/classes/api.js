import path from 'path'
import express from 'express'
import routeBuilder from 'express-routebuilder'
import Endpoints from 'endpoints'

export default new Endpoints.Application({
  searchPaths: [path.join(__dirname, '..', 'modules')],

  routeBuilder(routes, prefix) {
    return routeBuilder(new express.Router(), routes, prefix)
  },

  Controller: Endpoints.Controller.extend({
    baseUrl: '/v1',
    store: Endpoints.Store.bookshelf,
    format: Endpoints.Format.jsonapi,
    validators: [Endpoints.ValidateJsonSchema]
  })
})
