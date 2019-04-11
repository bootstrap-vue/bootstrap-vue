// Information about the current environment

// --- Constants ---

export const isBrowser =
  typeof window !== 'undefined' &&
  typeof document !== 'undefined' &&
  typeof navigator !== 'undefined'

export const hasEventListenerSupport = isBrowser && window.addEventListener

// Determine if the browser supports the option passive for events
export const hasPassiveEventSupport = (() => {
  let passiveEventSupported = false
  if (isBrowser) {
    try {
      const options = {
        get passive() {
          // This function will be called when the browser
          // attempts to access the passive property.
          passiveEventSupported = true
        }
      }
      window.addEventListener('test', options, options)
      window.removeEventListener('test', options, options)
    } catch (err) {
      passiveEventSupported = false
    }
  }
  return passiveEventSupported
})()

export const hasTouchSupport =
  isBrowser && ('ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0)

export const hasPointerEventSupport =
  isBrowser && Boolean(window.PointerEvent || window.MSPointerEvent)

// --- Getters ---

export const getEnv = (key, fallback = null) => {
  const env = typeof process !== 'undefined' && process ? process.env || {} : {}
  if (!key) {
    return env
  }
  return env[key] || fallback
}

export const getNoWarn = () => getEnv('BOOTSTRAP_VUE_NO_WARN')
