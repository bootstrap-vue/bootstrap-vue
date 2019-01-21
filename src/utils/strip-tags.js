const stripTagsRegex = /(<([^>]+)>)/ig

export function stripTags(text = '') {
  return text.replace(stripTagsRegex, '')
}
