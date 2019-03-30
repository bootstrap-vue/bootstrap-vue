// Info about the current environment

// Constants

export const inBrowser = typeof document !== 'undefined' && typeof window !== 'undefined'

export const isServer = !inBrowser

export const hasTouchSupport =
  inBrowser && ('ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0)

export const hasPointerEvent = inBrowser && Boolean(window.PointerEvent || window.MSPointerEvent)

// Getters

export const getGlobal = () => {
  if (typeof self !== 'undefined') {
    return self
  }
  if (typeof window !== 'undefined') {
    return window
  }
  if (typeof global !== 'undefined') {
    return global
  }
}

export const getProcess = () => {
  const glob = getGlobal()
  if (glob) {
    return glob.process
  }
}

export const getNoWarn = () => {
  const proc = getProcess()
  return proc && proc.env && proc.env.BOOTSTRAP_VUE_NO_WARN
}
