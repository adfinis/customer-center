import { redmineTrackerIcon } from '../../../helpers/redmine-tracker-icon'
import { module, test } from 'qunit'

module('Unit | Helper | redmine tracker icon')

test('it works', function(assert) {
  const result = redmineTrackerIcon(['Bug'])
  assert.ok(result.string.indexOf('fa-bug') > -1)
})
