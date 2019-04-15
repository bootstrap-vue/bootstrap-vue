import { keys } from '../../../utils/object'
import { isNull, isUndefined } from '../../../utils/inspect'

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
//

export default function stringifyObjectValues(val) {
  if (isUndefined(val) || isNull(val)) {
    /* istanbul ignore next */
    return ''
  }
  if (val instanceof Object && !(val instanceof Date)) {
    // Arrays are also object, and keys just returns the array indexes
    // Date objects we convert to strings
    return keys(val)
      .sort() /* sort to prevent SSR issues on pre-rendered sorted tables */
      .filter(v => !isUndefined(v) && !isNull(v)) /* ignore undefined/null values */
      .map(k => stringifyObjectValues(val[k]))
      .join(' ')
  }
  return String(val)
}
