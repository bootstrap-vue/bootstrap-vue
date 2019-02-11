const stripTagsRegex = /(<([^>]+)>)/gi

export function stripTags(text = '') {
  return text.replace(stripTagsRegex, '')
}

export function htmlOrText(innerHTML, textContent) {
  return innerHTML ? { innerHTML } : { textContent }
}
