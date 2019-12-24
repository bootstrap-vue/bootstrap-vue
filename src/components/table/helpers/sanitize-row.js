import identity from '../../../utils/identity'
import { keys } from '../../../utils/object'
import { arrayIncludes, concat } from '../../../utils/array'
import { isArray, isFunction } from '../../../utils/inspect'
import { IGNORED_FIELD_KEYS } from './constants'

// Convert object to array of ignored keys
const IGNORED = keys(IGNORED_FIELD_KEYS)

// Return a copy of a row after all reserved fields have been filtered out
const sanitizeRow = (row, ignoreFields, includeFields, fieldsObj = {}) => {
  const ignore = concat(IGNORED, ignoreFields).filter(identity)
  const include = isArray(includeFields) && includeFields.length > 0 ? includeFields : null
  return keys(row).reduce((obj, key) => {
    // Ignore special fields that start with `_`
    // Ignore fields in the `ignoreFields` array
    // Include only fields in the `includeFields` array (if present)
    if (!arrayIncludes(ignore, key) && !(include && !arrayIncludes(include, key))) {
      const f = fieldsObj[key] || {}
      const val = row[key]
      // `f.filterByFormatted` will either be a function or boolean
      // `f.formater` will have already been noramlized into a function ref
      const filterByFormatted = f.filterByFormatted
      const formatter = isFunction(filterByFormatted)
        ? filterByFormatted
        : filterByFormatted
          ? f.formatter
          : null
      obj[key] = isFunction(formatter) ? formatter(val, key, row) : val
    }
    return obj
  }, {})
}

export default sanitizeRow
