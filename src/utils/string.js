import { isArray, isPlainObject, isUndefinedOrNull } from './inspect'

// --- Constants ---

export const regExpReplaceRE = /[-/\\^$*+?.()|[\]{}]/g

// --- Utilities ---

export const escapeRegExp = str => str.replace(regExpReplaceRE, '\\$&')

// Convert a value to a string that can be rendered
export const toString = (val, spaces = 2) => {
  return isUndefinedOrNull(val)
    ? ''
    : isArray(val) || (isPlainObject(val) && val.toString === Object.prototype.toString)
      ? JSON.stringify(val, null, spaces)
      : String(val)
}
