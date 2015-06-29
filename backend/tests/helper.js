import chai, { expect } from 'chai'
import chaiAsPromised   from 'chai-as-promised'
import chaiHttp         from 'chai-http'

chai.use(chaiAsPromised)
chai.use(chaiHttp)

global.request = chai.request
global.expect  = expect
