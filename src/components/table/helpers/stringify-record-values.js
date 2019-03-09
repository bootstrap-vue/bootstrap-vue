import sanitizeRow from './sanitize-row'
import stringifyObjectValues from './stringify-object-values'

// Stringifies the values of a record, ignoring any special top level field keys
// TODO: add option to strigify formatted/scopedSlot items, and only specific fields
export default function stringifyRecordValues(row) {
  if (!(row instanceof Object)) {
    /* istanbul ignore next */
    return ''
  }
  return stringifyObjectValues(sanitizeRow(row))
}
