const RX_HTML_TAGS = /(<([^>]+)>)/gi

// Removes anything that looks like an HTML tag from the supplied string
export const stripTags = (text = '') => String(text).replace(RX_HTML_TAGS, '')

// Generate a `domProps` object for either `innerHTML`, `textContent` or an empty object
export const htmlOrText = (innerHTML, textContent) =>
  innerHTML ? { innerHTML } : textContent ? { textContent } : {}
