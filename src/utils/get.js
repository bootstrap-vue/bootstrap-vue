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
  // Handle aray of path values
  path = isArray(path) ? path.join('.') : path

  // If no path or no object passed
  if (!path || !isObject(obj)) {
    return defaultValue
  }

  // Handle edge case where user has dot(s) in top-level item field key
  // See https://github.com/bootstrap-vue/bootstrap-vue/issues/2762
  if (obj[path] !== undefined) {
    return obj[path]
  }

  // Handle string array notation (numeric indices only)
  path = String(path).replace(/\[(\d+)]/g, '.$1')

  const steps = path.split('.').filter(Boolean)
  // Handle case where someone pases a string of only dots
  if (steps.length === 0) {
    return defaultValue
  }

  // Traverse path in object to find result
  return steps.every(step => (obj = obj[step]) !== undefined) ? obj : defaultValue
}
