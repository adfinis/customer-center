import Ember from 'ember'

const {
  Handlebars: { Utils: { escapeExpression } },
  Helper: { helper }
} = Ember

export function nl2br([text]) {
  const breakTag = '<br />'
  // eslint-disable-next-line new-cap
  return `${escapeExpression(text)}`.replace(
    /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
    `$1${breakTag}$2`
  )
}

export default helper(nl2br)
