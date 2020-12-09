/**
 * Utilities to get information about the current environment
 */

export const getEnv = (key, fallback = null) => {
  const env = typeof process !== 'undefined' && process ? process.env || {} : {}
  if (!key) {
    /* istanbul ignore next */
    return env
  }
  return env[key] || fallback
}

export const getNoWarn = () =>
  getEnv('BOOTSTRAP_VUE_NO_WARN') || getEnv('NODE_ENV') === 'production'
