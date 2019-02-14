// Info about the current environment

export const inBrowser = typeof document !== 'undefined' && typeof window !== 'undefined'

export const isServer = !inBrowser

export const hasTouchSupport =
  inBrowser && ('ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0)

export const hasPointerEvent = inBrowser && Boolean(window.PointerEvent || window.MSPointerEvent)
