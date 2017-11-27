import Helper from '@ember/component/helper'
import { htmlSafe } from '@ember/string'
import Ember from 'ember'

const { Handlebars: { Utils: { escapeExpression } } } = Ember

const ICONS = {
  Task: 'tasks',
  Bug: 'bug',
  Feature: 'lightbulb-o',
  Support: 'support',
  Project: 'folder-open-o'
}

export function redmineTrackerIcon([trackerName]) {
  let icon = ICONS[trackerName] || 'puzzle-piece'
  return htmlSafe(
    `<i class="fa fa-${icon} title="${escapeExpression(trackerName)}"></i>`
  )
}

export default Helper.helper(redmineTrackerIcon)
