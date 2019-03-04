import { isArray } from './array'
import { isObject } from './object'

/**
 * Get property defined by dot/array notation in string.
 *
 * @link https://gist.github.com/jeneg/9767afdcca45601ea44930ea03e0febf#gistcomment-1935901
 *
 * @param {Object} obj
 * @param {string|Array} path
 * @param {*} defaultValue (optional)
 * @return {*}
 */
export default (obj, path, defaultValue = null) => {
  path = isArray(path) ? path.join('.') : path

  if (!path || !isObject(obj)) {
    return defaultValue
  }

  if (obj[path] !== undefined) {
    // Handle edge case where user has dot in actual field name
    // See https://github.com/bootstrap-vue/bootstrap-vue/issues/2762
    return obj[path]
  }

  // Handle string array notation (numeric indices only)
  path = String(path).replace(/\[(\d+)]/g, '.$1')

  const steps = path.split('.').filter(Boolean)
  if (steps.length === 0) {
    return defaultValue
  }

  return steps.every(step => (obj = obj[step]) !== undefined) ? obj : defaultValue
}
