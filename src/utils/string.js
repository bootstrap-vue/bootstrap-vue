// String utilities
import { isArray, isPlainObject, isString, isUndefinedOrNull } from './inspect'

// --- Constants ---

const RX_TRIM_LEFT = /^\s+/
const RX_TRIM_RIGHT = /\s+$/
const RX_REGEXP_REPLACE = /[-/\\^$*+?.()|[\]{}]/g

// --- Utilities ---

export const lowerFirst = str => {
  str = isString(str) ? str.trim() : String(str)
  return str.charAt(0).toLowerCase() + str.slice(1)
}

export const upperFirst = str => {
  str = isString(str) ? str.trim() : String(str)
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const escapeRegExp = str => str.replace(RX_REGEXP_REPLACE, '\\$&')

// Convert a value to a string that can be rendered
// `undefined`/`null` will be converted to `''`
// Plain objects and arrays will be JSON stringified
export const toString = (val, spaces = 2) => {
  return isUndefinedOrNull(val)
    ? ''
    : isArray(val) || (isPlainObject(val) && val.toString === Object.prototype.toString)
      ? JSON.stringify(val, null, spaces)
      : String(val)
}

// Remove leading white space from a string
export const trimLeft = str => toString(str).replace(RX_TRIM_LEFT, '')

// Remove Trailing white space from a string
export const trimRight = str => toString(str).replace(RX_TRIM_RIGHT, '')

// Remove leading and trailing white space from a string
export const trim = str => toString(str).trim()

// Lower case a string
export const lowerCase = str => toString(str).toLowerCase()

// Upper case a string
export const upperCase = str => toString(str).toUpperCase()
