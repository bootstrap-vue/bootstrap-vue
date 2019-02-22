import { isArray } from './array'
import { isObject } from './object'

/**
 * Get property defined by dot notation in string.
 *
 * @link https://gist.github.com/jeneg/9767afdcca45601ea44930ea03e0febf#gistcomment-1935901
 *
 * @param {Object} obj
 * @param {string|Array} path
 * @param {*} defaultValue (optional)
 * @return {*}
 */
export default (obj, path, defaultValue = null) => {
  if (!path || !isObject(obj)) {
    return defaultValue
  }

  path = isArray(path) ? path.join('.') : String(path).replace(/\[(\d+)]/g, '.$1')

  const parts = path.split('.').filter(Boolean)
  if (parts.length === 0) {
    return defaultValue
  }

  return parts.every(step => (obj = obj[step]) !== undefined) ? obj : defaultValue
}
