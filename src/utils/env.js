// Info about the current environment

// Constants

export const inBrowser = typeof document !== 'undefined' && typeof window !== 'undefined'

export const isServer = !inBrowser

export const hasTouchSupport =
  inBrowser && ('ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0)

export const hasPointerEvent = inBrowser && Boolean(window.PointerEvent || window.MSPointerEvent)

// Getters

export const getNoWarn = () =>
  typeof process !== 'undefined' && process && process.env && process.env.BOOTSTRAP_VUE_NO_WARN
