import { keys } from '../../../utils/object'
import { arrayIncludes } from '../../../utils/array'
import { IGNORED_FIELD_KEYS } from './constants'

// Return a copy of a row after all reserved fields have been filtered out
const sanitizeRow = (row, ignoreFields) =>
  keys(row).reduce((obj, key) => {
    // Ignore special fields that start with `_`
    if (!IGNORED_FIELD_KEYS[key] && !(ignoreFields && arrayIncludes(ignoreFields, key))) {
      obj[key] = row[key]
    }
    return obj
  }, {})

export default sanitizeRow
