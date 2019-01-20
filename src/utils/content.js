const _global = typeof window !== 'undefined' ? window : global

const useUnsafeHTML = Boolean(_global._BV__UNSAFE_HTML)

const stripTagsRegex = /(<([^>]+)>)/ig

export const CONTENT_PROP = useUnsafeHTML ? 'innerHTML' : 'textContent'

export function stripTags (text = '') {
  return useUnsafeHTML ? text : text.replace(stripTagsRegex, '')
}
