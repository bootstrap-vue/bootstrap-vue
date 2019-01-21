const stripTagsRegex = /(<([^>]+)>)/gi

export function stripTags(text = '') {
  return text.replace(stripTagsRegex, '')
}
