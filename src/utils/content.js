const _global = typeof window !== 'undefined' ? window : global

const useUnsafeHTML = Boolean(_global.BV_UNSAFE_HTML)

const stripTagsRegex = /(<([^>]+)>)/ig

export const CONTENT_PROP = useUnsafeHTML ? 'innerHTML' : 'textContent'

export function stripTags (text = '') {
  return useUnsafeHTML ? text : text.replace(stripTagsRegex, '')
}
