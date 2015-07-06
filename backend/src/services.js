import express      from 'express'
import RedmineProxy from './redmine/redmine-proxy'
import RTProxy      from './rt/rt-proxy'
import config       from '../config.json'

let router = new express.Router
export default router


const services = {
  redmine: function(service) {
    router.use(`/proxy/${service.host}`, RedmineProxy.createProxy(service))
  },
  rt: function(service) {
    router.use('/rt', RTProxy.createProxy(service))
  }
}

for (let service of config.services) {
  services[service.type](service)
}
