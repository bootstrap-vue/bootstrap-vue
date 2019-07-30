import { keys } from '../../../utils/object'
import { arrayIncludes, concat } from '../../../utils/array'
import { IGNORED_FIELD_KEYS } from './constants'

// Return a copy of a row after all reserved fields have been filtered out
const sanitizeRow = (row, ignoreFields, includeFields) =>
  keys(row).reduce((obj, key) => {
    // Ignore special fields that start with `_`
    // Ignore fields in the `ignoreFields` array
    // include only fields in the `includeFields` array
    if (
      !IGNORED_FIELD_KEYS[key] &&
      !(ignoreFields && arrayIncludes(concat(ignoreFields), key)) &&
      !(includeFields && !arrayIncludes(concat(includeFields), key))
    ) {
      obj[key] = row[key]
    }
    return obj
  }, {})

export default sanitizeRow
