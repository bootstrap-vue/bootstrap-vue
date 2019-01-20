const _global = typeof window !== 'undefined' ? window : global

export const CONTENT_PROP = _global._BV__UNSAFE_HTML ? 'innerHTML' : 'textContent'
