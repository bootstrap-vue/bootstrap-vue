import { isArray } from './array'
import { keys } from './object'

function isDate(obj) {
  return obj instanceof Date
}

function isFile(obj) {
  return obj instanceof File
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj) {
  return obj !== null && typeof obj === 'object' && !isArray(obj) && !isDate(obj)
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 * Returns boolean true or false
 */
function looseEqual(a, b) {
  if (a === b) {
    return true
  }
  if (isDate(a) && isDate(b)) {
    return a.getTime() === b.getTime()
  }
  if (isFile(a) && isFile(b)) {
    return a === b
  }
  if (isArray(a) && isArray(b)) {
    return a.length === b.length && a.every((e, i) => looseEqual(e, b[i]))
  }
  if (isObject(a) && isObject(b)) {
    if (keys(a).length !== keys(b).length) {
      return false
    }

    // Using for loop over `Object.keys()` here since some class
    // keys are not handled correctly otherwise
    let result = true
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key)
      const bHasKey = b.hasOwnProperty(key)
      if ((aHasKey && !bHasKey) || (!aHasKey && bHasKey) || !looseEqual(a[key], b[key])) {
        result = false
        break
      }
    }
    return result
  }
  if (!isObject(a) && !isObject(b)) {
    // Handle other cases
    return String(a) === String(b)
  }
  return false
}

export default looseEqual
