const stripTagsRegex = /(<([^>]+)>)/gi

export const stripTags = (text = '') => String(text).replace(stripTagsRegex, '')

export const htmlOrText = (innerHTML, textContent) => (innerHTML ? { innerHTML } : { textContent })
