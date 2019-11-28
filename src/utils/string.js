// String utilities
import { isArray, isPlainObject, isUndefinedOrNull } from './inspect'

// Convert a value to a string that can be rendered.
// undefined/null will be converted to ''
// Plain objects and Arrays will be JSON Stringified
export const toString = (val, spaces = 2) => {
  return isUndefinedOrNull(val)
    ? ''
    : isArray(val) || (isPlainObject(val) && val.toString === Object.prototype.toString)
      ? JSON.stringify(val, null, spaces)
      : String(val)
}

// Remove leading white space from a string
const RX_TRIM_LEFT = /^\s+/
export const trimLeft = str => toString(str).replace(RX_TRIM_LEFT, '')

// Remove Trailing white space from a string
const RX_TRIM_RIGHT = /\s+$/
export const trimRight = str => toString(str).replace(RX_TRIM_RIGHT, '')

// Lower case a string
export const lowerCase = str => toString(str).toLowerCase()

// Uower case a string
export const uppserCase = str => toString(str).toUpperCase()

// TODO:
//   Move other string like utilities here
