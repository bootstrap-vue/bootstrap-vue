import { arrayIncludes } from '../../../utils/array'
import { isArray, isFunction } from '../../../utils/inspect'
import { clone, keys, pick } from '../../../utils/object'
import { IGNORED_FIELD_KEYS } from './constants'

// Return a copy of a row after all reserved fields have been filtered out
const sanitizeRow = (row, ignoreFields, includeFields, fieldsObj = {}) => {
  // We first need to format the row based on the field configurations
  // This ensures that we add formatted values for keys that may not
  // exist in the row itself
  const formattedRow = keys(fieldsObj).reduce((result, key) => {
    const field = fieldsObj[key]
    const { filterByFormatted } = field
    const formatter = isFunction(filterByFormatted)
      ? /* istanbul ignore next */ filterByFormatted
      : filterByFormatted
        ? /* istanbul ignore next */ field.formatter
        : null

    if (isFunction(formatter)) {
      result[key] = formatter(row[key], key, row)
    }

    return result
  }, clone(row))

  // Determine the allowed keys:
  //   - Ignore special fields that start with `_`
  //   - Ignore fields in the `ignoreFields` array
  //   - Include only fields in the `includeFields` array
  const allowedKeys = keys(formattedRow).filter(
    key =>
      !IGNORED_FIELD_KEYS[key] &&
      !(isArray(ignoreFields) && ignoreFields.length > 0 && arrayIncludes(ignoreFields, key)) &&
      !(isArray(includeFields) && includeFields.length > 0 && !arrayIncludes(includeFields, key))
  )

  return pick(formattedRow, allowedKeys)
}

export default sanitizeRow
