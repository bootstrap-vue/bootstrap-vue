import { isObject } from '../../../utils/inspect'
import sanitizeRow from './sanitize-row'
import stringifyObjectValues from './stringify-object-values'

// Stringifies the values of a record, ignoring any special top level field keys
// TODO: add option to stringify formatted/scopedSlot items, and only specific fields
/* istanbul ignore next */
const stringifyRecordValues = row => (isObject(row) ? stringifyObjectValues(sanitizeRow(row)) : '')

export default stringifyRecordValues
