import { keys } from '../../../utils/object'
import { isDate, isObject, isUndefinedOrNull } from '../../../utils/inspect'
import { toString } from '../../../utils/string'

// Recursively stringifies the values of an object, space separated, in an
// SSR safe deterministic way (keys are sorted before stringification)
//
//   ex:
//     { b: 3, c: { z: 'zzz', d: null, e: 2 }, d: [10, 12, 11], a: 'one' }
//   becomes
//     'one 3 2 zzz 10 12 11'
//
// Primitives (numbers/strings) are returned as-is
// Null and undefined values are filtered out
// Dates are converted to their native string format
const stringifyObjectValues = val => {
  if (isUndefinedOrNull(val)) {
    /* istanbul ignore next */
    return ''
  }
  // Arrays are also object, and keys just returns the array indexes
  // Date objects we convert to strings
  if (isObject(val) && !isDate(val)) {
    return keys(val)
      .sort() // Sort to prevent SSR issues on pre-rendered sorted tables
      .filter(v => !isUndefinedOrNull(v)) // Ignore undefined/null values
      .map(k => stringifyObjectValues(val[k]))
      .join(' ')
  }
  return toString(val)
}

export default stringifyObjectValues
