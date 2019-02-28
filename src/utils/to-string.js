import { isArray } from './array'
import { isPlainObject } from './object'

/**
 * Convert a value to a string that can be rendered.
 */
export default (val) => {
  return val === null || val === undefined
    ? ''
    : isArray(val) || (isPlainObject(val) && val.toString === Object.prototype.toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}
