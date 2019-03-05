const stripTagsRegex = /(<([^>]+)>)/gi

export function stripTags(text = '') {
  return String(text).replace(stripTagsRegex, '')
}

export function htmlOrText(innerHTML, textContent) {
  return innerHTML ? { innerHTML } : { textContent }
}
