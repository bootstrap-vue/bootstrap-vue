import { isDate, isObject, isUndefinedOrNull } from './inspect'
import { keys } from './object'
import { toString } from './string'

// Recursively stringifies the values of an object, space separated, in an
// SSR safe deterministic way (keys are sorted before stringification)
//
//   ex:
//     { b: 3, c: { z: 'zzz', d: null, e: 2 }, d: [10, 12, 11], a: 'one' }
//   becomes
//     'one 3 2 zzz 10 12 11'
//
// Strings are returned as-is
// Numbers get converted to string
// `null` and `undefined` values are filtered out
// Dates are converted to their native string format
export const stringifyObjectValues = value => {
  if (isUndefinedOrNull(value)) {
    return ''
  }
  // Arrays are also object, and keys just returns the array indexes
  // Date objects we convert to strings
  if (isObject(value) && !isDate(value)) {
    return keys(value)
      .sort() // Sort to prevent SSR issues on pre-rendered sorted tables
      .map(k => stringifyObjectValues(value[k]))
      .filter(v => !!v) // Ignore empty strings
      .join(' ')
  }
  return toString(value)
}
