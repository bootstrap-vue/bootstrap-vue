import { isArray } from './array'
import { isInteger } from './number'
import { isObject } from './object'

/**
 * Get property defined by dot notation in string.
 *
 * @link https://gist.github.com/jeneg/9767afdcca45601ea44930ea03e0febf#gistcomment-1935901
 *
 * @param {Object} obj
 * @param {string|Array} path
 * @param {*} defaultValue
 * @return {*}
 */
export default (obj, path, defaultValue = null) => {
  if (!path || !isObject(obj)) {
    return defaultValue
  }

  if (isArray(path)) {
    path = path.reduce(
      (result, v) => `${result}${v ? (isInteger(v) ? `[${v}]` : `.${v}`) : ''}`,
      ''
    )
  } else {
    path = String(path).replace(/\[(\d+)]/g, '.$1')
  }

  return path
    .split('.')
    .filter(Boolean)
    .every(step => (obj = obj[step]) !== undefined)
    ? obj
    : defaultValue
}
