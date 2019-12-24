import { isObject } from '../../../utils/inspect'
import sanitizeRow from './sanitize-row'
import stringifyObjectValues from './stringify-object-values'

// Stringifies the values of a record, ignoring any special top level field keys
// TODO:
//   - Format the row first, make nested keys 'top level', then sanitize,
//     perhaps we need a format row helper method
//   - Add option to stringify `scopedSlot` items
const stringifyRecordValues = (row, ignoreFields, includeFields, fieldsObj) => {
  return isObject(row)
    ? stringifyObjectValues(sanitizeRow(row, ignoreFields, includeFields, fieldsObj))
    : ''
}

export default stringifyRecordValues
