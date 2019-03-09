import get from '../../../utils/get'
import stringifyObjectValues from './stringify-object-values'

// Default sort compare routine
//
// TODO: add option to sort by multiple columns (tri-state per column, plus order of columns in sort)
//  where sprtBy could be an array of objects [ {key: 'foo', sortDir: 'asc'}, {key:'bar', sortDir: 'desc'} ...]
//  or an array of arrays [ ['foo','asc'], ['bar','desc'] ]

export default function defaultSortCompare(a, b, sortBy) {
  a = get(a, sortBy, '')
  b = get(b, sortBy, '')
  if (
    (a instanceof Date && b instanceof Date) ||
    (typeof a === 'number' && typeof b === 'number')
  ) {
    // Special case for comparing Dates and Numbers
    return (a < b && -1) || (a > b && 1) || 0
  }
  return stringifyObjectValues(a).localeCompare(stringifyObjectValues(b), undefined, {
    numeric: true
  })
}
