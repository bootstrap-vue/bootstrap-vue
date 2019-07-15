import { isArray, isPlainObject, isString, isUndefinedOrNull } from './inspect'

// --- Constants ---

export const regExpReplaceRE = /[-/\\^$*+?.()|[\]{}]/g

// --- Utilities ---

export const lowerFirst = str => {
  str = isString(str) ? str.trim() : String(str)
  return str.charAt(0).toLowerCase() + str.slice(1)
}

export const upperFirst = str => {
  str = isString(str) ? str.trim() : String(str)
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const escapeRegExp = str => str.replace(regExpReplaceRE, '\\$&')

// Convert a value to a string that can be rendered
export const toString = (val, spaces = 2) => {
  return isUndefinedOrNull(val)
    ? ''
    : isArray(val) || (isPlainObject(val) && val.toString === Object.prototype.toString)
      ? JSON.stringify(val, null, spaces)
      : String(val)
}
