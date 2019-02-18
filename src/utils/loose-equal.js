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
 * Note object could be a complex type like array, date, etc.
 */
function isObject(obj) {
  return obj !== null && typeof obj === 'object'
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
  if (typeof a !== typeof b) {
    return false
  }
  const validDatesCount = [isDate(a), isDate(b)].filter(Boolean).length
  if (validDatesCount > 0) {
    return validDatesCount === 2 ? a.getTime() === b.getTime() : false
  }
  const validFilesCount = [isFile(a), isFile(b)].filter(Boolean).length
  if (validFilesCount > 0) {
    return validFilesCount === 2 ? a === b : false
  }
  const validArraysCount = [isArray(a), isArray(b)].filter(Boolean).length
  if (validArraysCount > 0) {
    return validArraysCount === 2
      ? a.length === b.length && a.every((e, i) => looseEqual(e, b[i]))
      : false
  }
  const validObjectsCount = [isObject(a), isObject(b)].filter(Boolean).length
  if (validObjectsCount > 0) {
    if (validObjectsCount === 1 || keys(a).length !== keys(b).length) {
      return false
    }
    // Using for loop over `Object.keys()` here since some class
    // keys are not handled correctly otherwise
    for (const key in a) {
      const validKeysCount = [a.hasOwnProperty(key), b.hasOwnProperty(key)].filter(Boolean).length
      if (validKeysCount === 1 || !looseEqual(a[key], b[key])) {
        return false
      }
    }
    return true
  }
  return false
}

export default looseEqual
