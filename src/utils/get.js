import idendity from './identity'
import { isArray, isObject } from './inspect'

const RX_ARRAY_NOTATION = /\[(\d+)]/g

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
const get = (obj, path, defaultValue = null) => {
  // Handle array of path values
  path = isArray(path) ? path.join('.') : path

  // If no path or no object passed
  if (!path || !isObject(obj)) {
    return defaultValue
  }

  // Handle edge case where user has dot(s) in top-level item field key
  // See https://github.com/bootstrap-vue/bootstrap-vue/issues/2762
  // Switched to `in` operator vs `hasOwnProperty` to handle obj.prototype getters
  // https://github.com/bootstrap-vue/bootstrap-vue/issues/3463
  if (path in obj) {
    return obj[path]
  }

  // Handle string array notation (numeric indices only)
  path = String(path).replace(RX_ARRAY_NOTATION, '.$1')

  const steps = path.split('.').filter(idendity)

  // Handle case where someone passes a string of only dots
  if (steps.length === 0) {
    return defaultValue
  }

  // Traverse path in object to find result
  // We use `!=` vs `!==` to test for both `null` and `undefined`
  // Switched to `in` operator vs `hasOwnProperty` to handle obj.prototype getters
  // https://github.com/bootstrap-vue/bootstrap-vue/issues/3463
  return steps.every(step => isObject(obj) && step in obj && (obj = obj[step]) != null)
    ? obj
    : defaultValue
}

export default get
