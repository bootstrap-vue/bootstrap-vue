import { keys } from '../../../utils/object'
import { IGNORED_FIELD_KEYS } from './constants'

// Return a copy of a row after all reserved fields have been filtered out
// TODO: add option to specify which fields to include
export default function sanitizeRow(row) {
  return keys(row).reduce((obj, key) => {
    // Ignore special fields that start with _
    if (!IGNORED_FIELD_KEYS[key]) {
      obj[key] = row[key]
    }
    return obj
  }, {})
}
