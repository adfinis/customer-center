import Ember from 'ember'

const { Handlebars, Helper } = Ember
const { escapeExpression } = Handlebars.Utils

const ICONS = {
  Task: 'tasks',
  Bug: 'bug',
  Feature: 'lightbulb-o',
  Support: 'support',
  Project: 'folder-open-o'
}

export function redmineTrackerIcon([trackerName]) {
  let icon = ICONS[trackerName] || 'puzzle-piece'
  return new Handlebars.SafeString(
    `<i class="fa fa-${icon} title="${escapeExpression(trackerName)}"></i>`
  )
}

export default Helper.helper(redmineTrackerIcon)
