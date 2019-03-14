const stripTagsRegex = /(<([^>]+)>)/gi

// Removes any thing that looks like an HTML tag from the supplied string
export const stripTags = (text = '') => String(text).replace(stripTagsRegex, '')

// Generate a domProps object for either innerHTML, textContent or nothing
export const htmlOrText = (innerHTML, textContent) => {
  return innerHTML ? { innerHTML } : textContent ? { textContent } : {}
}
